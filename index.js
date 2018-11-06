const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const server = require('./server.js');

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(`${client.user.username} ready for use.`);
});

client.on('message', msg => {
  if (msg.author.id !== client.user.id) {
    msg.channel.send(msg.content);
  }
});

client.on('message', msg => {
  if (msg.content.includes('test') && msg.author.id !== client.user.id) {
    msg.channel.send('it works');
  }
});

client.login(token);
