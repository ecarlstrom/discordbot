const ytdl = require('ytdl-core');

exports.run = async (client, message, args) => {
    if(!message.member.voiceChannel) {
        return message.channel.send(`🤠 Please enter a voice channel! 🤠`);
    }

    if(!args[0]) {
        return message.channel.send(`🤠 Please input a search term or URL! 🤠`);
    }

    let validate = await ytdl.validateURL(args[0]);

    if(!validate) {
        return message.channel.send(`🤠 Please use a valid term! 🤠`);
    }

    let info = await ytdl.getInfo(args[0]);
    let connection = await message.member.voiceChannel.join();
    let dispatcher = await connection.playStream(ytdl(args[0], { filter: 'audioonly' }));

    message.channel.send(`🤠 Now playing: ${info.title} 🤠`);
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'play',
    description: 'Plays the requested song from YouTube.',
    usage: 'play (URL or search term)'
};