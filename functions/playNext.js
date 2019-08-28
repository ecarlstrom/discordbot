const Discord = require('discord.js');
const embedCheck = require('./embedPerms.js');
const yt = require('ytdl-core');

const playNext = (message) => {
    const thisQueue = message.client.queues.get(message.guild.id);
    const nextSong = thisQueue.queue[++thisQueue.position];
    const dispatcher = message.guild.voiceConnection.playStream(yt(nextSong.url, {
        // test varying qualities when working
        quality: 'lowest',
        filter: 'audioonly'
    }), {
        passes: 5,
        volume: message.guild.voiceConnection.voulme || 0.2
    });

    thisQueue.dispatcher = dispatcher;

    if(embedCheck(message)) {
        const embed = new Discord.RichEmbed()
            .setTitle(`Now playing **${nextSong.songTitle}** (${nextSong.playTime})`)
            .setColor(0xc10404)
            .setFooter(`Requested by ${nextSong.requester}`, nextSong.requesterIcon)
            .setImage(`https://i.ytimg.com/vi/${nextSong.id}/mqdefault.jpg`)
            .setTimestamp()
            .setURL(nextSong.url);
        message.channel.send(embed, '', {
            disableEveryone: true
        });
    } else {
        message.channel.send(`Now playing **${nextSong.songTitle}** (${nextSong.playTime})`);
    }

    dispatcher.on('end', () => {
        if(thisQueue.position + 1 < thisQueue.queue.length) {
            playNext(message);
        } else {
            message.channel.send('🤠 Reached the end of the queue, please add some songs! 🤠');
            message.guild.voiceConnection.disconnect();
            message.client.queues.delete(message.guild.id);
        }
    });
};

module.exports = playNext;