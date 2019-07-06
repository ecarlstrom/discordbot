exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please enter a voice channel! 🤠');
    }

    if(client.queues.get(message.guild.id).dispatcher.paused) {
        return message.reply('The selected playback is already paused.');
    }

    await message.channel.sendMessage('Pausing!');
    client.queues.get(message.guild.id).dispatcher.pause();
};