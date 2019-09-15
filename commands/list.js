const Discord = require('discord.js');

exports.run = (client, message) => {
    // return a list of the server's custom emojis

    if(message.content === (process.env.prefix + 'list')) {
        const emojiList = message.guild.emojis.map(e => e.toString()).join('   ');
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
    name: 'list',
    description: 'Displays a list of the server\'s custom emojis.',
    usage: 'list'
};