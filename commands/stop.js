exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    try {
        if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
            return message.reply('🤠 Please join a voice channel! 🤠');
        }

        // if(message.guild.me.voiceChannelID !== message.member.voiceChannelID) {
        //     return message.reply(`🤠 You must be in the same voice channel as the bot! 🤠`)
        // };
        
        if(!client.queues.has(message.guild.id)) {
            // voiceChannel.leave();
            // erase queue first the leave, ideally - order has caused some problems
            // let queue = [];
            return message.reply(`🤠 Error encountered or no queue found, resetting music queue. 🤠`);
        }

        if(client.queues.has(message.guild.id)) {
            let queue = client.queues.get(message.guild.id);
            queue.queue = [];
            queue.dispatcher.end();
        }

        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection: ', reason.stack || reason);
        })
    } catch(err) {
        console.log(err.stack);
        return err;
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'stop',
    description: 'Ends the current playlist.',
    usage: 'stop'
};