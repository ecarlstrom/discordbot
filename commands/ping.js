exports.run = (bot, msg, params = []) => {
    msg.channel.send('Ping?')
        .then(message => {
            message.edit(`Pong! (time elapsed: ${message.createdTimestamp - msg.createdTimestamp}ms)`);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ping',
    description: 'Standard ping command, pings and returns total time elapsed.',
    usage: 'ping'
};