exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠 `);
    }

    if(client.queues.get(message.guild.id).dispatcher.paused) {
        return message.reply('Playback is already paused!');
    }

    await message.channel.send('Pausing playback!');
    client.queues.get(message.guild.id).dispatcher.pause();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['p'],
    permLevel: 0
};

exports.help = {
    name: 'pause',
    description: 'Pauses the stream.',
    usage: 'pause/p'
};