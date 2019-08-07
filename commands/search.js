const config = require('../config.json');
const ytapi = require('simple-youtube-api');
const youtube = new ytapi(config.youtubeAPIKey);

exports.run = async (client, message, args) => {
    let search = args.join(' ');

    try {
        const results = await youtube.searchVideos(search, 5);
        return message.channel.sendCode('', `Top 5 search results:\n\n 🤠 ${results.map(i =>
            `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n 🤠 ')}`);
        } catch(e) {
            message.reply(e.message);
        }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'search',
    description: 'Returns the top 5 YouTube search results for the given term.',
    usage: 'search (term)'
};