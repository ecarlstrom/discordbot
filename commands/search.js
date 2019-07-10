const config = require('../config.json');
const YT_API = require('simple-youtube-api');
const youtube = new YT_API(config.youtubeAPIKey);

exports.run = async (client, message, args) => {
    let search = args.join(' ');
    try {
        const results = await youtube.searchVideos(search, 5); // can modify this value as necessary
        return message.channel.sendCode('', `Top 5 results\n\n ${results.map(i => `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n ')}`);
    } catch(e) {
        message.reply(e.message);
    }
};

exports.conf = {
    enable: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'search',
    description: 'Finds a song on Youtube, returns 5 best results.',
    usage: 'search (term)'
};