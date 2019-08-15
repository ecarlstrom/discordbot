const config = require('dotenv').config();
const ytapi = require('simple-youtube-api');
const youtube = new ytapi(process.env.youtubeAPIKey);
const search = require('yt-search');

exports.run = async (client, message, args, ops) => {
    search(args.join(' '), function(err, res) {
        if(err) {
            return message.channel.send(`🤠 Sorry, an error occurred! 🤠`);
        }

        let videos = res.videos.slice(0, 5);
        let response = '';

        for(let i in videos) {
            response += `**[${parseInt(i)+1}]:** \`🤠 ${videos[i].title}, ${videos[i].duration} 🤠\`\n\n`
        }

        response += `\nPlease choose a number between \`1 - ${videos.length}\``;
        message.channel.send(response);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect', function(m) {
            let commandFile = require(`./play.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
        });
    });
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