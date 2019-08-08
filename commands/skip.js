exports.run = (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    let voiceUsers = Math.floor(message.member.voiceChannel.members.filter(m =>
        m.user.id !== client.user.id).size * 2 / 3);
    if(voiceUsers < 2 || message.author.permLevel > 2) {
        return message.channel.sendMessage(`🤠 Skipping song! 🤠`).then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }

    message.channel.sendMessage(`The 10 seconds skip timer begins now, needing at least ${voiceUsers} to pass. `);

    const filter = m => m.content.startsWith('skip');
    
    message.channel.awaitMessages(filter, {
        'errors': ['time'],
        'max': voiceUsers,
        time: 10000
    }).then(votes => {
        if(votes.size >= voiceUsers) return message.channel.sendMessage(`🤠 Skipping song! 🤠`).then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');       
        });
    }).catch(votes => {
        if(votes.size === 0) {
            return message.channel.sendMessage(`🤠 Sorry, no one voted! 🤠`);
        }
        message.channel.sendMessage(`🤠 Only ${votes.size} out of ${voiceUsers} voted! 🤠`);
    });
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