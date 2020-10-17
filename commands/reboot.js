exports.run = async(client, message) => {
    // 10/12: test this, not working correctly
    message.channel.send(`Are you sure you want to reboot? Reply with 'cancel' to abort, or allow 30 seconds for self-abort.`);

    const valid = ['yes', 'y', 'no', 'n', 'cancel'];
    const collector = message.channel.createCollector(m =>
        m.author.id === message.author.id, { time: 30000 });
    
    collector.on('message', async m => {
        const lower = m.content.toLowerCase();

        if(lower === 'cancel' || lower === 'no' || lower === 'n') {
            return collector.stop('abort');
        } else if(lower === 'yes' || lower === 'y') {
            return collector.stop('kill');
        }

        return message.channel.send(`Please supply a valid answer: \`${valid.join(' `, ` ')}\!`).catch(console.error);
    });

    collector.on('end', async(collected, reason) => {
        // if(reason === 'kill') {
        //     method one, seems to be the more thorough/standard way to do this
        //     add rebooting message for confirmation that something happened
        //     if(reason === 'kill') () => {
        //         spawn(process.argv[1], process.argv.slice(2), {
        //              detached: true, 
        //              stdio: ['ignore', out, err]
        //            }).unref()
        //            process.exit()
        //     await client.destroy();
        //     process.exit();

        //     method two
        //     spawn(process.argv[0], process.argv.slice(1), {
        //         env: { process_restart: 1 },
        //         stdio: 'ignore',
        //         detached: true
        //     }).unref();

            await client.destroy();
            process.exit();
        } else if(reason === 'time') {
            return message.channel.send('Reboot timed out!');
        } else if(reason === 'abort') {
            return message.channel.send('Aborting reboot!');
        }

        console.error('Invalid reason!');
    });

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection: ', reason.stack || reason);
    })

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'reboot',
    description: 'Reboots the bot.',
    usage: 'reboot'
};