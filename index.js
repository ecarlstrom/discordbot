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

  if(message.author.id === process.env.ownerID) {
    message.channel.send('Owner!');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  if(message.content === (prefix + 'test')) {
    message.channel.send('Hello!');
  }

  if(message.content === (prefix + 'azur')) {
    const embed = new Discord.RichEmbed()
      .setTitle('This is a test embed.')
      .setAuthor('Evan Carlstrom', 'https://imgur.com/se0joaV.png')
      .setColor(0x00AE86)
      .setDescription('Hello, this is a BallsBot embed test.')
      .setImage('https://imgur.com/se0joaV.png')
      .setThumbnail('https://imgur.com/se0joaV.png')
      .setTimestamp()
      // .setURL('www.google.com')
      .addField('Test field', 'text', true)
      .addBlankField(true) // for space
      .addField('Another field', 'text again', true)
      .addBlankField(true)
      .addField('A final field', 'more text', true);

    message.channel.send({embed});
  }

});

client.login(token);
