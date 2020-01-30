const config = require('dotenv').config();
const ytapi = require('simple-youtube-api');
const youtube = new ytapi(process.env.youtubeAPIKey);

exports.run = async (client, message, args) => {
    let search = args.join(' ');
    // hopefully building out a feature that will allow for results to be playable
    // work on search feature beginning this week
    try {
        const results = await youtube.searchVideos(search, 10);
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

/* basic search idea to be added: validate youtube URL (as in play.js), if valid then search.js 
can be loaded as command file, run command file with same arguments (client, message, args) as
search feature. */

// search will also need to return a number for each result, essentially a key-value pair, so that each entry has a reference
