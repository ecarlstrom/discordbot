exports.run = (client, message) => {
    if(message.content === (process.env.prefix + 'listnames')) {
        // this version includes the numerical ID of each custom emoji:
        // const emojiList = message.guild.emojis.map((e, x) => (x + ' = ' + e) + ' | ' + e.name).join('\n');
        const emojiList = message.guild.emojis.map((e) => (e) + '   |   ' + e.name).join('\n\n');
        for(let i = 0; i < emojiList.length; i += 2000) {
          const splitList = emojiList.substring(i, Math.min(emojiList.length, i + 2000));
          const embed = new Discord.RichEmbed()
            .setTitle(`Emojis for '${message.guild.name}': `)
            .setColor(0x003366)
            .setDescription(splitList);
          message.channel.send({embed});
      }
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'listnames',
    description: 'Displays a list of the server\'s custom emojis along with their names.',
    usage: 'listnames'
};