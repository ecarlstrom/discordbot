const Discord = require('discord.js');
const embedCheck = require('../functions/embedPerms.js');

exports.run = (client, message) => {
    if(!client.queues.has(message.guild.id)) {
        return message.channel.send(`🤠 Queue is empty! 🤠`);
    }

    // 1/16 note: check on queue behavior in the event that a song exceeding the allowed time limit is requested
    // check for both cases: either song is the only one in the current queue or not, behavior seems different
    let queue = client.queues.get(message.guild.id);
    queue = queue.queue.slice(queue.position);

    const current = queue.shift();
    let singular = queue.length === 1;

    const embed = new Discord.RichEmbed()
        .setTitle(`Now playing: **${current.songTitle.substring(0, 50)}** (${current.playTime})`)
        .setColor(0xDD2825)
        .setFooter(`Requested by ${current.requester}`, current.requesterIcon)
        .setDescription(`There ${singular ? 'is' : 'are'} currently ${queue.length} song${singular ? '' : 's'} in the queue.\n`)
        .setThumbnail(`https://i.ytimg.com/vi${current.id}/mqdefault.jpg`)
        .setTimestamp()
        .setURL(current.url);
    if(embedCheck(message)) {
        for(let i = 0; i < queue.length && i < 10; i++) {
            embed.addField(`🤠 ${queue[i].songTitle.substring(0, 50)} (${queue[i].playTime}) 🤠`, `Requested by **${queue[i].requester}**`);
        }
        message.channel.send(embed, '', {
            disableEveryone: true
        }).catch(console.error);
    } else {
        // test this formatting, this could be a mess
        message.channel.send(`Currently playing ${current.songTitle}* (${current.playTime}) requested by ${current.requester}**\n\nThere 
        ${singular ? 'is' : 'are'} currently${queue.length} song${singular ? '' : 's'} in the queue\n${queue.map.size === 0 ? '' : '🤠' + queue.map(i =>
            '_' + i.songTitle+'_ (' + i.playTime + ') requested by **' + i.requester + '**\n <https://www.youtube.com/watch?v='+i.id+'\n').join('\n🤠 ')}`);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playlist', 'q'],
    permLevel: 0
};

exports.help = {
    name: 'queue',
    description: 'Displays the current queue of songs.',
    usage: 'queue/q'
};