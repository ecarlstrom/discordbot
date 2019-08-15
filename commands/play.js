const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const embedCheck = require('../functions/embedPerms.js');
const config = require('dotenv').config();
const playNext = require('../functions/playNext.js');
const ytapi = require('simple-youtube-api');
const { parse } = require('url');
const youtube = new ytapi(process.env.youtubeAPIKey);
const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {
   if(!message.member.voiceChannel) {
       return message.channel.send(`🤠 Please join a voice channel! 🤠`);
   }

   if(!args[0]) {
       return message.channel.send(`🤠 Please supply a URL or search term! 🤠`);
   }

   let check = await ytdl.validateURL(args[0]);
   if(!check) {
        let commandFile = require(`./search.js`);
        return commandFile.run(client, message, args, ops);
   }

   let info = await ytdl.getInfo(args[0]);
   let connection = await message.member.voiceChannel.join();
   let dispatcher = await connection.play(ytdl(args[0], { filter: 'audioonly' }));

   message.channel.send(`🤠 Now playing: ${info.title} 🤠`);
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