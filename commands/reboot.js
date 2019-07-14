// NOTE: this file/command is again not for music playback but rather reboots the bot

exports.run = async (client, message) => {
    message.channel.sendMessage('Are you sure you want to reboot? Enter yes/y for yes, no/n or \`cancel\` to abort. Auto-abort in 30 seconds.');

    const valid = ['yes', 'y', 'no', 'n', 'cancel'];
    const collector = message.channel.createCollector(m => m.author.id === message.author.id, { time: 30000 });

    collector.on('message', async m => {
        const lower = m.content.toLowerCase();
        if(lower === 'cancel' || lower === 'no' || lower === 'n') {
            return collector.stop('abort');
        } else if(lower === 'yes' || lower === 'y') {
            return collector.stop('kill');
        }

        return message.channel.sendMessage(`Only \`${valid.join('`, `')}\` are valid, please use these!`).catch(console.error);
    });

    collector.on('end', async (collected, reason) => {
        if(reason === 'kill') {
            await client.destroy();
            process.exit();
        } else if(reason === 'time') {
            return message.channel.sendMessage('Reboot timed out!');
        } else if(reason === 'abort') {
            return message.channel.sendMessage('Aborting reboot.');
        }

        console.error('Invalid reason for reboot!');
    });
};