const Discord = require('discord.js');
const embed = new Discord.RichEmbed();
const embedCheck = require('../functions/embedPerms.js');
const config = require('..config.json');
const playNext = require('../functions/playNext.js');
const YT_API = require('simple-youtube-api');
const { parse } = require('url');
const youtube = new YT_API(config.youtubeAPIKey);

