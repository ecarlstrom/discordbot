exports.run = (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please enter a voice channel! 🤠');
    }

    if(client.queues.has(message.guild.id)) {
        let queue = client.queues.get(message.guild.id);
        queue.queue = [];
        queue.dispatcher.end();
    }
};

// file exports

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'stop',
    description: 'Stops the current playlist.',
    usage: 'stop'
};