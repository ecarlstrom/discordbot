exports.run = async (client, message, args) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('Please enter a voice channel! 🤠');
    }

    let vol = args.join(' ');
    if(!vol) {
        return message.channel.sendMessage(`Current volume is ${client.queues.get(message.guild.id).dispatcher.volume * 100}%`);
    }

    if (vol < 0 || vol > 100) {
        return message.reply('Volume must be between 0 and 100!');
    }

    await message.channel.sendMessage(`Setting volume to ${vol} percent.`).catch(console.error);
    message.guild.voiceConnection.volume = (vol / 100);
    client.queues.get(message.guild.id).dispatcher.setVolume(vol / 100);
};