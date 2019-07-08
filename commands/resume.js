exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please enter a voice channel! 🤠');
    }

    if(!client.queues.get(message.guild.id).dispatcher.paused) {
        return message.reply(`Playback must be paused to use the resume command.`);
    }

    await message.channel.sendMessage('Resuming!');
    client.queues.get(message.guild.id).dispatcher.resume();
};

