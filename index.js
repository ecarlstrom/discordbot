////////// GENERAL DEPENDENCIES //////////

const Discord = require('discord.js');
const config = require('dotenv').config();
const client = new Discord.Client();
const token = process.env.DISCORD_BOT_SECRET;
const lol_api = process.env.LOL_API_KEY;
const server = require('./server.js');
const moment = require('moment');
// will add another dependency for music bot event handling when the folder is up

client.login(token);
require('./util/eventLoader')(client);
// managing event emitters for the various commands, avoids resource leakage
require('events').EventEmitter.defaultMaxListeners = 50;

////////// LEAGUE DEPENDENCIES //////////

const fs = require('fs');
const gm = require('gm');
const request = require('request');
const urlencode = ('urlencode');
const roundTo = require('round-to');

////////// WEATHER DEPENDENCIES //////////

const weather = require('weather-js');

//////////////////////////////////////////

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(`${client.user.username} ready for use.`);
});

// some general message rules

const prefix = process.env.prefix;
const musicPrefix = process.env.musicPrefix;
const weatherPrefix = process.env.weatherPrefix;
const forecastPrefix = process.env.forecastPrefix;

client.on('message', (message) => {

  if(message.content.includes('tama') || message.author.id === process.env.tamaID) {
    // const cop = client.emojis.find(emoji => emoji.name === 'cop');
    // message.channel.send(`👮`);
    // message.reply(`👮`);
    message.react('👮');
  }
  
  //kippy rule as per his request

  if(message.content.includes('kippy') || message.author.id === process.env.kippyID) {
    message.react('🐳');
    message.react('🐋');
  }

  if(!message.content.startsWith(prefix) || message.author.bot) return;

  if(message.content === (prefix + 'seeusmile')) {
    const embed = new Discord.RichEmbed()
      .setTitle('When I see U Smile and know that is not for me, that is when i\'ll miss U the most..')
      .setColor('0xDCDCDC')
      .setImage('https://i.imgur.com/hUTCznj.png')
      .setThumbnail('https://cdn.discordapp.com/emojis/519203018302947335.png')
      .setFooter(`User with a broken heart: ${message.member.displayName}`)
      .setTimestamp()
    message.channel.send({embed});
  }

  if(message.content === (prefix + 'seeusmall')) {
    const embed = new Discord.RichEmbed()
      .setTitle('When I see U Smile and know that is not for me, that is when i\'ll miss U the most..')
      .setColor('0xDCDCDC')
      .setThumbnail('https://cdn.discordapp.com/emojis/519203018302947335.png')
      .setFooter(`User with a broken heart: ${message.member.displayName}`)
      .setTimestamp()
    message.channel.send({embed});
  }

  // testing emoji replies and reactions

  // if(message.content === (prefix + 'DrSEG')) {
  //   const DrSEG = client.emojis.find(emoji => emoji.name === 'DrSEG');
  //   message.reply(`${DrSEG}`);
  //   message.react(DrSEG);
  // }
});
// placeholder for "dadbot"-style commands as per server request
// looking at more "dadbot" rules/options

// adding a new message event here since variables are used, the below handles game/status activity

client.on('message', message => {
  let input = message.content.split(' ').slice(1);
  let args = input.join(' ');

  if(!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  // these change the bot's game and status

  if(message.content.startsWith(prefix + 'setgame')) {
    client.user.setActivity(args);
  }

  if(message.content.startsWith(prefix + 'setstatus')) {
    // accepts the 4 Discord statuses: online, idle, dnd, invisible
    client.user.setStatus(args);
  }

  // will see if changing guild member game/status is also possible

  // nickname changing

  // if(message.content.startsWith(prefix + 'name')) {
  //   if(!message.guild.me.hasPermission('MANAGE_NICKNAMES') || !message.guild.me.hasPermission('CHANGE_NICKNAME')) {
  //     return message.channel.send(`🤠 Sorry, I do not have name changing permissions on this server! `);
  //   }
  //   message.member.setNickname(message.content.replace('name', ''))
  // }
});

/////////////////////////////// ***** USER HANDLING ***** ///////////////////////////////

// includes features like greeting new users, kicking, banning, permission handling, etc.

// handles greeting of new users and removes users from the newUsers list if they leave while on it so the greeting
// is not addressed to an invalid user. This won't be necessary for small servers while the message triggers on
// each join, but for larger batches (i.e. newUsers[guild.id].size > 10) it will be useful.

// const newUsers = [];
// maybe test some sort of message trigger here?
// client.on('guildMemberAdd', (member) => {
//   const guild = member.guild;
//   if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
//   newUsers[guild.id].set(member.id, member.user);

//   if(newUsers[guild.id].size = 1) {
//     const userlist = newUsers[guild.id].map(u => u.toString()).join(' '); // not necessary for 1, useful for larger servers
//     guild.channels.find(channel => channel.name === 'general').send(`Welcome, ${userlist}!`);
//     newUsers[guild.id].clear();
//   }
// });

// client.on('guildMemberRemove', (member) => {
//   const guild = member.guild;
//   if(newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
// }); // prevents greeting of invalid users if they leave while in the newUsers greeting queue

// kicks user from a voice channel (in kind of an inefficient way for now, will edit later)

// client.on('message', async (message) => {
//   if(!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS']))
//     return message.reply('Missing required channel management and/or member moving permission(s).');

//   const user = message.mentions.users.first();
//   const member = message.mentions.members.first();
// // //   // above line stores the @mentioned user, following lines check to make sure
// // //   // there is a mention and that the user is in a voice channel.
//   if(!member) return message.reply('Please @mention a specific user.');
//   if(!member.voiceChannel) return message.reply('Specified user is not in a voice channel.');

//   const temp_voice = await message.guild.createChannel(user.id, 'voice', [
//     { id: guild.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
//     { id: member.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
//   ]);
//   await member.setVoiceChannel(temp_voice);

//   await temp_voice.delete(); // creates temporary voice channel that awaits the
// // //   // mention and then moves the user in before deleting the channel

//   msg.react('👍'); // check with a reaction
// });

//////// testing out some guild-related features to familiarize myself with the issues the voice channel permissions code might be having //////////

// create a guild (limited to bots with < 10 guilds for now)

client.on('message', (message) => {

  if(message.content === (prefix + 'guildtest')) {
    async function createGuild(client, message) {
      try {
        const guild = await client.user.createGuild('Test Guild', 'hello');
        const defaultChannel = guild.channels.find(channel => channel.permissionsFor(guild.me).has("SEND_MESSAGES"));
        const invite = await defaultChannel.createInvite();
        await message.author.send(invite.url);
        const role = await guild.createRole({ name: 'Test Role', permissions: ['ADMINISTRATOR'] });
        await message.author.send(role.id);
      } catch(err) {
        console.error(err);
      }
    }

    createGuild(client, message);
    message.member.addRole('<ROLE>');
  }
});

/////////////////////////////// ***** MUSIC BOT ***** ///////////////////////////////

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queues = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
  if(err) {
    console.error(err);
  }

  log(`Loading a total of ${files.length} commands.`);
  files.forEach(file => {
    let props = require(`./commands/${file}`);

    log(`Loading ${props.help.name} command. `);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];

      let cmd = require(`./commands/${command}`);

      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if(cmd === command) {
          client.aliases.delete(alias);
        }
      });

      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch(e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  let permlvl = 0;

  if(message.author.id === config.owner) {
    return permlvl = 10;
  }

  if(!message.guild) {
    return permlvl;
  }

  if(message.guild) {
    let mod_role = message.guild.roles.find(mod_role => mod_role.name === config.modRole);
    if(mod_role && message.member.roles.has(mod_role.id)) permlvl = 2;

    let super_mod_role = message.guild.roles.find(super_mod_role => super_mod_role.name === config.superModRole);
    if(super_mod_role && message.member.roles.has(super_mod_role.id)) permlvl = 3;

    let admin_role = message.guild.roles.find(admin_role => admin_role.name === config.adminRole); 
    if(admin_role && message.member.roles.has(admin_role.id)) permlvl = 4;

    if(message.author.id === message.guild.owner.id) {
      permlvl = 5;
    }
    return permlvl;
  };

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Uncaught Promise Error: ', reason.stack || reason)
  });
}