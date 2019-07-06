const Discord = require('discord.js');
const embedCheck = require('./emberPerms.js');
const yt = require('ytdl-core');

const playNext = (message) => {
    const currentQueue = message.client.queues.get(message.guild.id);
    const next = currentQueue.queue[++currentQueue.position];
    const dispatcher = message.guild.voiceConnection.playStream(yt(next.url, {
        quality: 'lowest', // will see if higher qualities are possible now with boosters etc.
        filter: 'audioonly'
    }), {
        passes: 5,
        volume: message.guild.voiceConnection.volume || 0.2
    });

    currentQueue.dispatcher = dispatcher;
    if(embedCheck(message)) {
        const embed = new Discord.RichEmbed()
            .setTitle(`Currently playing **${next.songTitle}** (${next.playTime})`)
            .setColor(OxDD2825) // change this one as well
            .setFooter(`Song requested by ${next.requester}`, next.requesterIcon)
            .setImage(`https://i.ytimg.com/vi/${next.id}/mqdefault.jpg`)
            .setTimestamp()
            .setURL(next.url);
        
        message.channel.sendEmbed(embed, '', {
            disableEveryone: true
        });
    } else {
        message.channel.sendMessage(`Now playing **${next.songTitle}** (${next.playTime})`);
    }

    dispatcher.on('end', () => {
        if(currentQueue.position + 1 < currentQueue.queue.length) {
            playNext(message);
        } else {
            message.channel.sendMessage('No morer songs in queue, add some! 🤠');
            message.guild.voiceConnection.disconnect();
            message.client.queues.delete(message.guild.id);
        }
    });
};

module.exports = playNext;