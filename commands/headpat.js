exports.run = (client, message) => {
    if(message.content.startsWith(process.env.prefix)) {
        const headpatEmoji = message.guild.emojis.find(emoji => emoji.name === "headpat")
        return message.reply(headpatEmoji);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'headpat',
    description: 'Headpats the user.',
    usage: 'headpat'
};