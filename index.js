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
    console.log('Owner!');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  if(message.content === (prefix + 'test')) {
    message.channel.send('Hello!');
  }

  if(message.content === (prefix + 'azur')) {
    const embed = new Discord.RichEmbed()
      .setTitle('This is a test embed.')
      .setAuthor('AUTHOR NAME', 'https://imgur.com/se0joaV.png')
      .setColor('00AE86')
      .setDescription('Hello, this is a BallsBot embed test.')
      .setImage('https://imgur.com/se0joaV.png')
      .setFooter('Here is some footer text', 'https://imgur.com/se0joaV.png' )
      .setThumbnail('https://imgur.com/se0joaV.png')
      .setTimestamp()
       .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
      .addField('Test field', 'text', true)
      .addBlankField(true) // for space
      .addField('Another field', 'text again', true)
      .addBlankField(true)
      .addField('A final field', 'more text', true);

    message.channel.send({embed});
  }

  // testing emoji replies and reactions

  if(message.content === (prefix + 'coptest')) {
    const cop = client.emojis.find(emoji => emoji.name === 'cop');
    message.reply(`${cop}`);
    message.react('27ea5cf73c2aabb6e8bf523e117ff5dc');
  }

  // return a list of th eserver's custom emojis

  if(message.content === (prefix + 'list')) {
    const emojiList = message.guild.emojis.map(e => e.toString()).join('   ');
    message.channel.send(emojiList);
  }

});

client.login(token);
