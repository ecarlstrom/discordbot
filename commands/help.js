const config = require('../config.json');

exports.run = (client, message, args) => {
    if(!args[0]) {
        const cmdName = Array.from(client.commands.key());
        const largest = cmdName.reduce((long, str) => Math.max(long, str.length), 0);

        message.channel.sendCode('asciidoc', `Command List\n----------\n\n[Use ${config.prefix} help <commandname> for details]\n\n${client.commands.map(c => 
            `${config.prefix}${c.help.name}${' '.repeat(largest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`);
    } else {
        let command = args[0];
        if(client.commands.has(command)) {
            command = client.commands.get(command);
            message.channel.sendCode('asciidoc', `= ${command.help.name} = \n${command.help.description}\nUsage:: ${command.help.usage}`);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h'],
    permLevel: 0
};

exports.help = {
    name: 'help',
    description: 'Displays a list of commands.',
    usage: 'help (command)'
};