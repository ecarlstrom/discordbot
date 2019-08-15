exports.run = async (client, message, args, ops) => {
    let server = ops.active.get(message.guild.id);

    if(!server) {
        return message.channel.send(`🤠 No song currently playing! 🤠`);
    }

    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        return message.channel.send(`🤠 Please join the bot's voice channel! 🤠`);
    }

    let voiceUsers = message.member.voiceChannel.members.size;
    let votesNeeded = Math.ceil(voiceUsers / 2);

    if(!server.queue[0].voteSkips) {
        server.queue[0].voteSkips = [];
    }

    // user attempts to cast more than one vote
    if(server.queue[0].voteSkips.includes(message.member.id)) {
        return message.channel.send(`🤠 Nice try, only one vote per person! ${server.queue[0].voteSkips.length}/${votesNeeded} votes are required. 🤠`);
    }

    server.queue[0].voteSkips.push(message.member.id);
    ops.active.set(message.guild.id, server);

    if(server.queue[0].voteSkips.length >= votesNeeded) {
        message.channel.send(`🤠 Skipping current song! 🤠`);
        return server.dispatcher.end();
    }

    message.channel.send(`🤠Skip vote successful! ${server.queue[0].voteSkips.length}/${votesNeeded} votes required. 🤠`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['next'],
    permLevel: 0
};

exports.help = {
    name: 'skip',
    description: 'Skips the current song.',
    usage: 'skip/next'
};