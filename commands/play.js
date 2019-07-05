const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const embedCheck = require('../functions/embedPerms.js');
const config = require('..config.json');
const playNext = require('../functions/playNext.js');
const YT_API = require('simple-youtube-api');
const { parse } = require('url');
const youtube = new YT_API(config.youtubeAPIKey);

exports.run = async(client, message, args) => {
    let song = args.join(' ');
    if(!song.length) {
      return message.reply('Please specify a Youtube URL or a search term! 🤠');
    }
  
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);
  
    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
      return message.reply('Please enter a voice channel! 🤠');
    }
  
    if(!client.queues.has(message.guild.id)) {
      let first = true;
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
  
      if (/^(www\.)?youtube\.com/.test(parsed.hostname)) {
        return parsed.query.v;
      } else if (/^(www\.)?youtu\.be/.test(parsed.hostname)) {
        return parsed.pathname.slice(1);
      }
    })();
  
    if(!id) {
      // looks for the proper video in the event of no specific ID and assigns it
      let results = await youtube.searchVideos(song, 4);
      id = results[0].id;
    }
  
    let info;
    try {
      info = await youtube.getVideo(id);
    } catch (e) {
      return message.channel.sendMessage(`\`Error: ${e}\``);
    }
  
    // can change this bit later, setting initial max time to 15 minutes (900s)
    if(message.author.permLevel < 2 && parseInt(info.durationSeconds) > 900) {
      return message.reply('Sorry, song requests cannot exceed 15 minutes! 🤠').catch(console.error);
    }
  
    let time = parseInt(info.durationSeconds, 10);
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if(seconds < 10) seconds = '0' + seconds; //formatting
  
    client.queues(get.message.guild.id).queue.push({
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
        .setTitle(`**${info.title}** (${minutes}:${seconds}) added to queue.`)
        .setColor(OxDD2825) // testing color
        // self-note: colorbook.io
        .setFooter(`Requested by ${message.guild.member(message.author).displayName}`, message.author.avatarURL)
        .setImage(`https://i.ytimg.com/vi/${info.id}/mqdefault.jpg`)
        .setTimestamp()
        .setURL(`https://www.youtube.com/watch?v=${info.id}`);
      if(embedCheck(message)) {
        message.channel.sendEmbed(embed, '', {
          disableEveryone: true
        }).catch(console.error);
      } else {
        message.channel.sendMessage(`**${info.title}** (${minutes}:${seconds}) added to queue.`);
      }
    }
  };
  
  // file exports

  exports.conf = {
      enabled: true,
      guildOnly: false,
      aliases: [],
      permLevel: 0
  };

  exports.help = {
      name: 'play',
      description: 'Plays the selected song from Youtube.',
      usage: 'play (Youtube URL or search term)'
  };