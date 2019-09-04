exports.run = (client, message, args, ops) => {
    if(!message.member.voiceChannel) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    if(message.guild.me.voiceChannelID === message.member.voiceChannelID) {
        return message.reply(`🤠 Already in here! 🤠`);
    }

    message.member.voiceChannel.join();
    message.channel.send(`👋🤠 Hello! `);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'join',
    description: 'Brings the bot into the current voice channel.',
    usage: 'join'
};