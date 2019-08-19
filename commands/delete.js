exports.run = (client, message, args, tools) => {
    if(!args[0]) return;

    if(isNaN(args[0])) {
        return message.channel.send(`🤠 Please specify the number of messages to delete! 🤠`);
    }

    if(args[0] > 100) {
        return message.channel.send(`🤠 Sorry, deletion limit is 100 messages! 🤠`);
    }

    message.channel.bulkDelete(++args[0]).then (messages => 
        message.channel.send(`🤠 Successfully removed \`${messages.size}/${args[0]}\` messages! 🤠`).catch(error =>
            message.channel.send(``)));
        // will add a timeout delete to the above if necessary, not a big deal for now
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'delete',
    description: 'Deletes the given number of previous messages.',
    usage: 'delete (number of messages)'
};