exports.run = async(client, message, args) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

    let vol = args.join(' ');

    // console.log(vol);
    // console.log(typeof(vol));

    if(!vol) {
        return message.channel.send(`Current volume is ${client.queues.get(message.guild.id).dispatcher.volume * 100}%.`);
    }

    if(vol < 0 || vol > 100) {
        return message.reply(`🤠 Volume must be a percentage between 0 and 100! 🤠`);
    } else if(isNaN(vol)) {
        return message.reply(`🤠 Nice try, please use a numerical value! 🤠`)
    }

    await message.channel.send(`Setting volume to ${vol}%.`).catch(console.error);
    message.guild.voiceConnection.volume = (vol / 100);
    client.queues.get(message.guild.id).dispatcher.setVolume(vol / 100);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['v', 'vol'],
    permLevel: 0
};

exports.help = {
    name: 'volume',
    description: 'Sets the volume of playback.',
    usage: 'volume/vol (percentage)'
};