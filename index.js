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

//////////////////  ***** BOT CODE *****  ////////////////////////

client.on('ready', () => {
  console.log('Bot connected!');
  console.log(`${client.user.username} ready for use.`);
});

// some general message rules

const prefix = process.env.prefix;
const musicPrefix = process.env.musicPrefix;
const weatherPrefix = process.env.weatherPrefix;
const forecastPrefix = process.env.forecastPrefix;

// 12/21/2019 placeholder commit: updated more ytdl-related packages
// fs, gm, request updated 12/22

client.on('message', (message) => {

  if(message.content.includes('tama') || message.author.id === process.env.tamaID) {
    // const cop = client.emojis.find(emoji => emoji.name === 'cop');
    message.react('👮');
  }
  
  // kippy rule as per his request

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
});

// placeholder for "dadbot"-style commands as per server request



// adding a new message event here since variables are used, the below handles game/status activity

client.on('message', message => {
  let input = message.content.split(' ').slice(1);
  let args = input.join(' ');

  if(!message.content.startsWith(prefix) || message.author.bot) {
    return;
  }

  // these change the bot's game and status
  // seeing if there is a way to do this for different game/status displays on different servers
  
  if(message.content.startsWith(prefix + 'setgame')) {
    client.user.setActivity(args);
  }

  if(message.content.startsWith(prefix + 'setstatus')) {
    // accepts the 4 Discord statuses: online, idle, dnd, invisible
    client.user.setStatus(args);
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
  // Loads commands when the bot starts
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

// used for the 'reload' command, will delete cached version of the command that was loaded previously and then load

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
  // assigns permission levels for particular commands based on server role
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
  
  // general error handling, will add more
  
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Uncaught Promise Error: ', reason.stack || reason)
  });
}