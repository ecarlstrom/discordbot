const Discord = require('discord.js');
const weather = require('weather-js');
const moment = require('moment');

exports.run = (client, message) => {
    let forecastMessageCaps = message.content.toUpperCase();
    let sender = message.author;
    let contents = message.content.slice(process.env.forecastPrefix.length).split(' ');
    let args = contents.slice(1);
  
    if(message.content.startsWith(process.env.forecastPrefix)) {
  
      weather.find({search: args.join(' '), degreeType: 'F'}, function(err, result) {
        if(err) {
          return message.reply(`🤠 Please input a location! 🤠`);
        }
  
        if(result === undefined || result.length === 0) {
          message.channel.send(`🤠 Sorry, there are no results for your search term! 🤠`)
          return;
        } 
      
        let forecastOutput = result[0].forecast;
        let location = result[0].location;
  
        if(forecastOutput) {
          let today = new Date();
          let day = today.getDay() || 7; 
  
          if( day !== 1 ) {              
             today.setHours(-24 * (day - 1));   
          }     
  
          let formattedDay = moment(today).format('MM-DD-YYYY');    
          const embed = new Discord.RichEmbed()
            .setTitle(`Forecast for week beginning ${formattedDay} for ${location.name}: `)
            .setColor(0xd3d3d3)
            .addField(`Monday: *__${forecastOutput[0].skytextday}__*`, `High ${forecastOutput[0].high}, low ${forecastOutput[0].low}`, true)
            .addField(`Tuesday: *__${forecastOutput[1].skytextday}__*`, `High ${forecastOutput[1].high}, low ${forecastOutput[1].low}`, true)
            .addField(`Wednesday: *__${forecastOutput[2].skytextday}__*`, `High ${forecastOutput[2].high}, low ${forecastOutput[2].low}`, true)
            .addField(`Thursday: *__${forecastOutput[3].skytextday}__*`, `High ${forecastOutput[3].high}, low ${forecastOutput[3].low}`, true)
            .addField(`Friday: *__${forecastOutput[4].skytextday}__*`, `High ${forecastOutput[4].high}, low ${forecastOutput[4].low}`, true)
            .addBlankField(true)
            .setFooter(`Weekend data will be available when the API allows retrieval, sorry!`)
            .setTimestamp()
  
        message.channel.send({embed});
        }
    });
  }
  
  process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection: ', reason.stack || reason);
  })
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'forecast',
    description: 'Returns five-day weekday forecast for the given location.',
    usage: 'forecast (location)'
};