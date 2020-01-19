exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }   
            // simpler troubleshooting method: if queue exists, return a message saying the command can't be used
            if(client.queues.has(message.guild.id)) {
                return message.reply(`🤠 Cannot do this while music is playing! 🤠`);
            }

            voiceChannel.join()
                .then(connection => {
                const hashDispatch = connection.playFile('C:/Users/Evan/Downloads/cstrike.mp3');
            
                if((client.queues.has(message.guild.id))) {
                    hashDispatch.on('end'), () => {
                        client.queues.get(message.guild.id).dispatcher.resume();
                }}

                if((!client.queues.has(message.guild.id))) {
                    hashDispatch.on('end', () => {
                    voiceChannel.leave();
                })
            }}).catch(console.error.stack || console.error)

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cs'],
    permLevel: 0
};

exports.help = {
    name: 'counterstrike',
    // will see if it's possible to add the requested emote to this description
    description: 'RIGHT THROUGH THE COUNTERSTRIKE',
    usage: 'counterstrike/cs'
};
