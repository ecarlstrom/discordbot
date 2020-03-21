const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const embedCheck = require('../functions/embedPerms.js');
const config = require('dotenv').config();
const playNext = require('../functions/playNext.js');
const ytapi = require('simple-youtube-api');
const { parse } = require('url');
const youtube = new ytapi(process.env.youtubeAPIKey);
const m3u8stream = require('m3u8stream');
const parseTime = require('m3u8stream/dist/parse-time');

exports.run = async (client, message, args) => {
    let song = args.join(' ');

    if(!song.length) {
        return message.reply(`🤠 Please use a YouTube URL or search term! 🤠`);
    }

    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    // this will need to check if a queue already exists to function properly
    
    // if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
    //     return message.reply(`🤠 You must be in the same voice channel as the bot! 🤠`)
    // }

    if(!client.queues.has(message.guild.id)) {
        var firstSong = true;
        client.queues.set(message.guild.id, {
            dispatcher: null,
            queue: [],
            connection: null,
            position: -1
        });
        await voiceChannel.join();
    }

    let id = (() => {
        const parsed = parse(song, true);

        if(/^(www\.)?youtube\.com/.test(parsed.hostname)) {
            return parsed.query.v;
        } else if(/^(www\.)?youtu\.be/.test(parsed.hostname)) {
            return parsed.pathname.slice(1);
        }
    })();

    if(!id) {
        let results = await youtube.searchVideos(song, 4);
        id = results[0].id;
    }

    let info;
    try {
        info = await youtube.getVideoByID(id);
    } catch(e) {
        console.log(e.stack || e);
    }
    // see what may cause this to result in bot getting stuck in voice channels
    if(message.author.permLevel < 2 && parseInt(info.durationSeconds) > 900) {
        return message.reply(`🤠 Sorry, song time limit is 15 minutes! 🤠`).catch(console.error.message);
    }

    let time = parseInt(info.durationSeconds, 10);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    client.queues.get(message.guild.id).queue.push({
        url: `https://www.youtube.com/watch?v=${info.id}`,
        id: info.id,
        channName: info.channel.title,
        songTitle: info.title,
        playTime: `${minutes}:${seconds}`,
        playTimeSeconds: info.durationSeconds,
        requester: message.guild.member(message.author).displayName,
        requesterIcon: message.author.avatarURL
    });

    if(firstSong) {
        playNext(message);
    } else {
        embed
            .setTitle(`**${info.title}** (${minutes}:${seconds}) added to queue!`)
            .setColor(0xc10404)
            .setFooter(`Requested by ${message.guild.member(message.author).displayName}`, message.author.avatarURL)
            .setImage(`https://i.ytimg.com/vi/${info.id}/mqdefault.jpg`)
            .setTimestamp()
            .setURL(`https://www.youtube.com/watch?v=${info.id}`);
        if(embedCheck(message)) {
            message.channel.send(embed, '', {
                disableEveryone: true
            }).catch(console.error);
        } else {
            message.channel.send(`**${info.title}** (${minutes}:${seconds}) added to queue!`);
            // adjust so that the bot will leave the voice channel in this case
            // the bot failing to leave seems to cause a queueing issue as well, look into this
        }
    }

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection: ', reason.stack || reason);
    })
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'play',
    description: 'Plays the requested song from YouTube.',
    usage: 'play (URL or search term)'
};