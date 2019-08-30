exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply('🤠 Please be in a voice channel first! 🤠');
    }

    if(!client.queues.get(message.guild.id).dispatcher.paused) {
        return message.reply('Playback has not been paused yet!');
    }

    await message.channel.send('Resuming playback.');
    client.queues.get(message.guild.id).dispatcher.resume();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['r'],
    permLevel: 0
};

exports.help = {
    name: 'resume',
    description: 'Resumes playlist after playback has been paused.',
    usage: 'resume/r'
};