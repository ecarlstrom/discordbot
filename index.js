const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(client.user.username);
});

client.on('message', msg => {
  if (msg.author.id !== client.user.id) {
    msg.channek.send(msg.content);
  }
});

client.login(token);
