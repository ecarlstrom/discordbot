const Discord = require('discord.js');
const embedCheck = require('./embedPerms.js');
const ytdl = require('ytdl-core');
const m3u8stream = require('m3u8stream');
const parseTime = require('m3u8stream/dist/parse-time');

const playNext = async (message) => {
    const thisQueue = message.client.queues.get(message.guild.id);
    const nextSong = thisQueue.queue[++thisQueue.position];
    const dispatcher = message.guild.voiceConnection.playStream(ytdl(nextSong.url, {
        // test varying qualities when working
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1<<25
    }),{
        passes: 5,
        volume: message.guild.voiceConnection.volume || 0.70
    }, {highWaterMark: 1});

    thisQueue.dispatcher = dispatcher;

    try {
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
    } catch(err) {
        console.log(err.stack || err);
        return;
    }

};

module.exports = playNext;