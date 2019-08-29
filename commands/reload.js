exports.run = async(client, msg, params) => {
    let command;

    if(client.commands.has(params[0])) {
        command = params[0];
    } else if(client.aliases.has(params[0])) {
        command = client.aliases.get(params[0]);
    }

    if(!command) {
        return msg.channel.send(`🤠 Sorry, cannot find '${params[0]}' command! 🤠`);
    }

    const m = await msg.channel.send(`🤠 Reloading '${command}' command! 🤠`);

    try {
        await client.reload(command);
    } catch(e) {
        return m.edit(`Failed command reload: ${command}\n\`\`\`${e.stack}\`\`\``);
    }

    return m.edit(`🤠 Command '${command}' successfully reloaded! 🤠`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rld'],
    permLevel: 0
};

exports.help = {
    name: 'reload',
    description: 'Reloads the given command file in case of issues or updates.',
    usage: 'reload/rld (commandname)'
};