exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null); 

    if(!voiceChannel || (!message.member.voiceChannel)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    let voiceUsers = Math.floor(message.member.voiceChannel.members.filter(m =>
        m.user.id !== client.user.id).size * 2 / 3);
    
    if(voiceUsers < 999) {
        return message.channel.send(`🤠 Skipping song! 🤠`).then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['next'],
    permLevel: 0
};

exports.help = {
    name: 'skip',
    description: 'Skips the current song.',
    usage: 'skip/next'
};