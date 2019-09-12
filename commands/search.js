const config = require('dotenv').config();
const ytapi = require('simple-youtube-api');
const youtube = new ytapi(process.env.youtubeAPIKey);

exports.run = async (client, message, args) => {
    let search = args.join(' ');

    try {
        const results = await youtube.searchVideos(search, 5);
        return message.channel.sendCode('', `Top 5 search results:\n\n 🤠 ${results.map(i =>
            `${i.title}\n https://www.youtube.com/watch?v=${i.id}\n`).join('\n 🤠 ')}`);
        } catch(e) {
            message.reply(e.message);
        }

        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection: ', reason.stack || reason);
        })
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