exports.run = (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('🤠 Please join a voice channel! 🤠');
    }

    if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
        return message.reply(`🤠 You must be in the same voice channel as the bot! 🤠`)
    };
    
    if(!client.queues.has(message.guild.id)) {
        voiceChannel.leave();
        return message.reply(`🤠 Error encountered or no queue found, resetting music queue. 🤠`);
    }

    if(client.queues.has(message.guild.id)) {
        let queue = client.queues.get(message.guild.id);
        queue.queue = [];
        queue.dispatcher.end();
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'stop',
    description: 'Ends the current playlist.',
    usage: 'stop'
};