const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const server = require('./server.js');

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(`${client.user.username} ready for use.`);
});

// some general message rules

const prefix = process.env.prefix;

client.on('message', (message) => {

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  if(message.content === (prefix + 'test')) {
    message.channel.send('Hello!');
  }

  if(message.content === (prefix + 'azur')) {
    message.channel.send('Azur Lane: https://azurlane.yo-star.com/#/');
  }

});

client.login(token);
