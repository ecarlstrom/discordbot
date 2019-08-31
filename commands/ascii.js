const ascii = require('ascii-art');

exports.run = (client, message, args) => {

    ascii.font(args.join(' '), 'Doom', function(rendered) {
        // test for any necessary whitespace removal additions
       
        console.log(typeof(args[0]));
        if(!args.join(' ')) {
            return message.reply(`🤠 Please enter some text to format! 🤠`)
        }

        rendered = rendered.trimRight();

        if(rendered.length > 2000) {
            return message.channel.send(`🤠 Sorry, ASCII messages cannot exceed 2,000 characters! 🤠`);
        } else if(rendered == null) {
            return message.channel.send(`🤠`);
        }
        console.log(rendered);
        message.channel.send(rendered, {
            code: 'md'
        })
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