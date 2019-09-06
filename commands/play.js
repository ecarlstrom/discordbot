const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const embedCheck = require('../functions/embedPerms.js');
const config = require('dotenv').config();
const playNext = require('../functions/playNext.js');
const ytapi = require('simple-youtube-api');
const { parse } = require('url');
const youtube = new ytapi("AIzaSyAod-f4LRhucDhK6CLdel2VHyg9zxuWBms");

exports.run = async (client, message, args) => {
    let song = args.join(' ');

    if(!song.length) {
        return message.reply(`🤠 Please use a YouTube URL or search term! 🤠`);
    }

    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    if(!client.queues.has(message.guild.id)) {
        var firstSong = true;
        client.queues.set(message.guild.id, {
            dispatcher: null,
            queue: [],
            connection: null,
            position: -1
        });
        await voiceChannel.join();
        console.log("Queue from play.js: " + client.queues);
    }

    let id = (() => {
        const parsed = parse(song, true);

        if(/^(www\.)?youtube\.com/.test(parsed.hostname)) {
            console.log("Parsed: " + parsed);
            console.log("Parsed query: " + parsed.query.v);
            return parsed.query.v;
        } else if(/^(www\.)?youtu\.be/.test(parsed.hostname)) {
            console.log("Pathname: " + parsed.pathname.slice);
            return parsed.pathname.slice(1);
        }
    })();

    if(!id) {
        let results = await youtube.searchVideos(song, 4);
        id = results[0].id;
        console.log("Results: " + results, id);
    }

    let info;
    try {
        // console.log(id);
        info = await youtube.getVideoByID(id);
        console.log("Info: + " + info);
        // console.log('again: ' + id);
    } catch(e) {
        console.log(e.stack || e);
    }

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
        }
    }
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
