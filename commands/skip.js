exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null); 

    if(!voiceChannel || (!message.member.voiceChannel)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    let voiceUsers = Math.floor(message.member.voiceChannel.members.filter(m =>
        m.user.id !== client.user.id).size * 2 / 3);
    
    if(voiceUsers < 2) {
        return message.channel.sendMessage(`🤠 Skipping song! 🤠`).then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }

    message.channel.sendMessage(`🤠 Beginning the ten-second skip vote, needing at least ${voiceUsers} votes to pass. Use "skip" (not !skip) to vote. 🤠`);

    const filter = m => m.content.startsWith('skip');

    message.channel.awaitMessages(filter, {
        'errors': ['time'],
        'max': voiceUsers,
        time: 10000
    }).then(collected => {
        if(collected.size >= voiceUsers) return message.channel.send(`🤠 Skipping song! 🤠`).then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }).catch(collected => {
        if(collected.size === 0) {
            return message.channel.send(`🤠 Sorry, no one voted! 🤠`)
        }
        message.channel.send(`🤠 Only ${collected.size} of ${voiceUsers} voted, no skip! 🤠`);
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