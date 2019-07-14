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
    
    if(embedCheck(message)) {
        for(let i = 0; i < queue.length && i < 5; i++) {
            embed.addField(`🎧 ${queue[i].songTitle.substring(0, 50)} (${queue[i].playTime})`, `🤠 Requested by **${queue[i].requester}**`);
        }
        message.channel.sendEmbed(embed, '', {
            disableEveryone: true
        }).catch(console.error);
    } else {
        message.channel.sendMessage(`Currently playing *${currentItem.songTitle}* (${currentItem.playTime}) requested by **${currentItem.requester}**\n\n`); // maybe add current queue information here?
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['playlist'], // see if 'q' is already taken
    permLevel: 0
};

exports.help = {
    name: 'queue',
    description: 'Displays current queue of songs.', // update if "currently playing" is not changed
    usage: 'queue'
};