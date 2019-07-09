exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please enter a voice channel! 🤠');
    }

    let voiceUsers = Math.floor(message.member.voiceChannel.members.filter(m => m.user.id !== client.user.id).size * 2 / 3);
    if(voiceUsers < 2 || message.author.permLevel > 2) {
        return message.channel.sendMessage('Skipping current song.').then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }

    message.channel.sendMessage(`Voting to skip current song has begun! At least ${voiceUsers} votes required.`);
    const filter = m => m.content.startsWith('skip'); // perhaps something more specific later?
    message.channel.awaitMessage(filter, {
        'errors': ['time'],
        'max': voiceUsers,
        time: 10000
    }).then(collected => {
        if(collected.size >= voiceUsers) return message.channel.sendMessage('Skipping!').then(() => {
            client.queues.get(message.guild.id).dispatcher.end('skip');
        });
    }).catch(collected => {
        if(collected.size === 0) {
            return message.channel.sendMessage('No votes to skip!');
        }
        message.channel.sendMessage(`Total of ${collected.size} votes to skip, not enough!`);
    });
};

