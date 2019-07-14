const Discord = require('discord.js');
const embedCheck = require('../functions/embedPerms.js');

exports.run = (client, message) => {
    if(!client.queues.has(message.guild.id)) {
        return message.channel.sendMessage(`Queue is empty! 🤠`);
    }
}