const Discord = require('discord.js');
const weather = require('weather-js');

exports.run = (client, message) => {
  let weatherMessageCaps = message.content.toUpperCase();
  let sender = message.author;
  let contents = message.content.slice(process.env.weatherPrefix.length).split(' ');
  let args = contents.slice(1);

  if(message.content.startsWith(process.env.weatherPrefix)) {

    weather.find({search: args.join(' '), degreeType: 'F'}, function(err, result) {
      if(err) {
        return message.reply(`🤠 Please input a location! 🤠`);
      }

      // weather-js should return an array of objects
      // current{} contains current weather data, location{} is location information
      // console.log(JSON.parse(JSON.stringify(result[0].current, null, 2)));
      if(result === undefined || result.length === 0) {
        message.channel.send(`🤠 Sorry, there are no results for your search term! 🤠`)
        return;
      } 
     
      let weatherOutput = result[0].current;
      let location = result[0].location;
      
      if(weatherOutput) {
        let temp = weatherOutput.temperature;
        // console.log(temp);
        const embed = new Discord.RichEmbed()
          .setTitle(`Current weather conditions for ${location.name}: *__${weatherOutput.skytext}__* `)
          .setDescription(`Temperature of ${weatherOutput.temperature} degrees ${location.degreetype}, feels like ${weatherOutput.feelslike}. Humidity ${weatherOutput.humidity}%. `)
          .addBlankField(true)
          .addField(`Sky conditions: ${weatherOutput.skytext}`,
            `Wind at ${weatherOutput.winddisplay}.`)
          .addBlankField(true)
          .setFooter('Want a forecast instead? Use the !forecast command!')
          .setThumbnail(`${weatherOutput.imageUrl}`)
          .setTimestamp()
          
          // changes color scheme of sidebar based on temperature

          if(temp >= 80) {
            embed.setColor(0xFF6700)
          } else if(temp >= 60 && temp <= 79) {
            embed.setColor(0xADFF2F)
          } else {
            embed.setColor(0x00FFFF)
          }

          // displays severe weather alerts if any, otherwise gives an all-clear

          if(!location.alert) {
            embed.addField(`No weather alerts!`, `👍`)
            embed.addBlankField(true)
          } else {
            embed.addField(`🚨 Local weather alert:`, `${location.alert} 🚨`)
            embed.addBlankField(true)
          }
        message.channel.send({embed} || err.message);
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
    aliases: ['w'],
    permLevel: 0
};

exports.help = {
    name: 'weather',
    description: 'Returns current weather conditions for the given location.',
    usage: 'weather/w (location)'
};