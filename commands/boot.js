exports.run = (client, message, args) => {
    if(!message.member.voiceChannel) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    if(!message.guild.me.voiceChannel) {
        return message.reply(`🤠 Bot is not connected to the voice channel! 🤠`);
    }

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
        return message.reply(`🤠 You must be in the same voice channel as the bot! 🤠`)
    };

    message.guild.me.voiceChannel.leave();
    message.channel.send(`👋🤠 Bye! `);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kick'],
    permLevel: 0
};

exports.help = {
    name: 'boot',
    description: 'Kicks the bot from the current voice channel.',
    usage: 'boot/kick'
};