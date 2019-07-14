const Discord = require('discord.js');
const embedCheck = require('../functions/embedPerms.js');

exports.run = (client, message) => {
    if(!client.queues.has(message.guild.id)) {
        return message.channel.sendMessage(`Queue is empty! 🤠`);
    }

    let queue = client.queues.get(message.guild.id);
    queue = queue.queue.slice(queue.position);

    const currentItem = queue.shift();
    let single = queue.length === 1;
    
    const embed = new Discord.RichEmbed();
    embed
        .setTitle(`Currently playing **${currentItem.songTitle.substring(0, 50)}** (${currentItem.playTime})`)
        .setColor(0xDD2825) // usual "change this" note applies
        .setFooter(`Request made by ${currentItem.requester}`, currentItem.requesterIcon)
        .setDescription(`There ${singular ? 'is' : 'are'} currently ${queue.length} song${singular ? '' : 's'} in the queue.\n`) // check ternaries for accuracy
        .setThumbnail(`https://i.tyimg.com/vi/${current.id}/mqdefault.jpg`)
        .setTimestamp()
        .setURL(currentItem.url);

}