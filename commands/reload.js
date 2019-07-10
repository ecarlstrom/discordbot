// NOTE: reload is not for music playback
// this manually reloads a specified command file in the event of an error or update

exports.run = async (client, msg, params) => {
    let command;
    if(client.commands.has(params[0])) {
        command = params[0];
    } else if(client.aliases.has(params[0])) {
        command = client.aliases.get(params[0]);
    } // these should cover all possible valid command entries

    if(!command) {
        return msg.channel.sendMessage(`Cannot find ${params[0]} command!`);
    }

    const x = await msg.channel.sendMessage(`Reloading ${command} command.`);

    try {
        await client.reload(command);
    } catch(e) {
        return x.edit(`Failed to reload ${command}\n\`\`\`${x.stack}\`\`\``);
    }
    return x.edit(`Successfully reloaded ${command} command.`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['rl'],
    permLevel: 3 // this might change depending on server needs
};

exports.help = {
    name: 'reload',
    description: 'Reloads a given command file in the event of an error or update.',
    usage: 'reload (commandname)'
};