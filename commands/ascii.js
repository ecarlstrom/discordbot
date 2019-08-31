const ascii = require('ascii-art');

exports.run = (client, message, args, ops) => {

    ascii.font(args.join(' '), 'Doom', function(rendered) {
        // test for any necessary whitespace removal additions

        // try if(!rendered.length style fix tomorrow to solve ascii crashes)
        if(!args[0]) {
            return message.reply(`🤠 Please enter some text to format! 🤠`)
        }

        if(typeof(args[0] !== "string")) {
            return message.channel.send(`🤠 Sorry, cannot convert this into ASCII yet! 🤠`);
        }
        
        rendered = rendered.trimRight();

        if(rendered.length > 2000) {
            return message.channel.send(`🤠 Sorry, ASCII messages cannot exceed 2,000 characters! 🤠`);
        }

        message.channel.send(rendered, {
            code: 'md'
        });
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'ascii',
    description: 'Returns ASCII version of input text.',
    usage: 'ascii (message)'
};