const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const lol_api = process.env.LOL_API_KEY;
const server = require('./server.js');

client.login(token);

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

  if(message.content.includes('tama') && !message.content.startsWith(prefix)) {
    // const cop = client.emojis.find(emoji => emoji.name === 'cop');
    // message.channel.send(`👮`);
    // message.reply(`👮`);
    message.react('👮');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;


  if(message.content === (prefix + 'test')) {
    message.channel.send('Hello!');
  }

  if(message.content === (prefix + 'azur')) {
    const embed = new Discord.RichEmbed()
      .setTitle('Azur Lane')
      .setAuthor('**final bot name here**', 'https://imgur.com/se0joaV.png')
      .setColor('00AE86')
      .setDescription('Azur Lane - Official Website')
      .setImage('https://imgur.com/se0joaV.png')
      .setFooter('Here is some footer text', 'https://imgur.com/se0joaV.png' )
      .setThumbnail('https://imgur.com/se0joaV.png')
      .setTimestamp()
       .setURL("https://azurlane.yo-star.com/")
      .addField('Twitter', 'https://twitter.com/AzurLane_EN', true)
      .addBlankField(true) // for space
      .addField('Reddit', 'https://www.reddit.com/r/AzureLane/', true)
      .addBlankField(true)
      .addField('A final field', 'more text', true);

    message.channel.send({embed});
  }

  // testing emoji replies and reactions

  if(message.content === (prefix + 'DrSEG')) {
    const DrSEG = client.emojis.find(emoji => emoji.name === 'DrSEG');
    message.reply(`${DrSEG}`);
    message.react(DrSEG);
  }

  // return a list of the server's custom emojis

  if(message.content === (prefix + 'list')) {
    const emojiList = message.guild.emojis.map(e => e.toString()).join('   ');
    message.channel.send(emojiList);
  }

  // return a list of custom emojis with emoji ID included

  if(message.content === (prefix + 'listnames')) {
    // this version includes the numerical ID of each custom emoji:
    // const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
    const emojiList = message.guild.emojis.map((e) => (e) + '   |   ' + e.name).join('\n\n');
    message.channel.send(emojiList);
  }

});

/////////////////////////////// ***** USER HANDLING ***** ///////////////////////////////

// includes features like greeting new users, kicking, banning, permission handling, etc.

// handles greeting of new users and removes users from the newUsers list if they leave while on it so the greeting
// is not addressed to an invalid user. This won't be necessary for small servers while the message triggers on
// each join, but for larger batches (i.e. newUsers[guild.id].size > 10) it will be useful.

const newUsers = [];
// maybe test some sort of message trigger here?
client.on('guildMemberAdd', (member) => {
  const guild = member.guild;
  if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
  newUsers[guild.id].set(member.id, member.user);

  if(newUsers[guild.id].size = 1) {
    const userlist = newUsers[guild.id].map(u => u.toString()).join(' '); // not necessary for 1, useful for larger servers
    guild.channels.find(channel => channel.name === 'general').send(`Welcome, ${userlist}!`);
    newUsers[guild.id].clear();
  }
});

client.on('guildMemberRemove', (member) => {
  const guild = member.guild;
  if(newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
}); // prevents greeting of invalid users if they leave while in the newUsers greeting queue

// kicks user from a voice channel (in kind of an inefficient way for now, will edit later)

// client.on('message', async (message) => {
//   if(!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS']))
//     return message.reply('Missing required channel management and/or member moving permission(s).');

  const user = message.mentions.users.first();
  const member = message.mentions.members.first();
//   // above line stores the @mentioned user, following lines check to make sure
//   // there is a mention and that the user is in a voice channel.
  if(!member) return message.reply('Please @mention a specific user.');
  if(!member.voiceChannel) return message.reply('Specified user is not in a voice channel.');

  const temp_voice = await message.guild.createChannel(user.id, 'voice', [
    { id: guild.id,
      deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
    { id: member.id,
      deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
  ]);
  await member.setVoiceChannel(temp_voice);

  await temp_voice.delete(); // creates temporary voice channel that awaits the
//   // mention and then moves the user in before deleting the channel

  msg.react('👍'); // check with a reaction
// });

////////// testing out some guild-related features to familiarize myself with the issues the voice channel permissions code might be having //////////

// create a guild (limited to bots with < 10 guilds for now)

// client.on('message', (message) => {

//   if(message.content === (prefix + 'guildtest')) {
//     async function createGuild(client, message) {
//       try {
//         const guild = await client.user.createGuild('Test Guild', 'hello');
//         const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
//         const invite = await defaultChannel.createInvite();
//         await message.author.send(invite.url);
//         const role = await guild.createRole({ name: 'Test Role', permissions: ['ADMINISTRATOR'] });
//         await message.author.send(role.id);
//       } catch(err) {
//         console.error(err);
//       }
//     }

//     createGuild(client, message);
//     message.member.addRole('<ROLE>');
//   }
// })

/////////////////////////////// ***** MUSIC BOT ***** ///////////////////////////////

/////////////////////////////// ***** LEAGUE API ***** ///////////////////////////////

// League API and associated endpoints

//
// const url_info =
// const url_champion =
// const url_items =
// const url_itempicture =
// const url_summonerID =
// const url_live =
// const url_getchamp =
// const url_getchampmastery =
// const url_getrank =

// will see how new runes work as opposed to getrunes/get masteries endpoints for the old setup

let queues = {
  '0': 'Custom',
  '2': 'Normal 5v5 Blind Pick',
  '14': 'Normal 5v5 Draft Pick',
  '4': 'Ranked Solo 5v5',
  '6': 'Ranked Premade 5v5', // does this ID still work with flex queues?
  '65': 'ARAM'

  // basic setup for now, there may be some overlap with new/old i.e. 'Ranked Solo 5v5' vs. 'Ranked Solo'
};

let maps = {
  '1': `Summoner's Rift`,
  '4': 'Twisted Treeline',
  '12': 'Howling Abyss'

  // there is also another SR map at ID 11 and TT at 10, not sure what any differences are
};
