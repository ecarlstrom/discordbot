exports.run = async (client, message) => {
    const voiceChannel = message.member.voiceChannel ? message.member.voiceChannel : (message.guild.voiceConnection ? message.guild.voiceConnection.channel : null);

    if(!voiceChannel || (!message.member.voiceChannel && message.author.permLevel < 2)) {
        return message.reply(`🤠 Please join a voice channel! 🤠`);
    }

            if(client.queues.has(message.guild.id)) {
                client.queues.get(message.guild.id).dispatcher.pause();
            }
            voiceChannel.join()
                .then(connection => {
                console.log(client.queues);
                const hankDispatch = connection.playFile('C:/Users/Evan/Downloads/fellas.mp3');
            
                if((client.queues.has(message.guild.id))) {
                    hankDispatch.on('end'), () => {
                        client.queues.get(message.guild.id).dispatcher.resume();
                }}

                if((!client.queues.has(message.guild.id))) {
                    hankDispatch.on('end', () => {
                    voiceChannel.leave();
                })
            }}).catch(console.error.stack || console.error)
            // test other approaches

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'fellas',
    description: 'Poor Hank :(',
    usage: 'fellas'
};