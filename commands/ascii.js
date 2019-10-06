const ascii = require('ascii-art');

exports.run = (client, message, args) => {

    ascii.font(args.join(' '), 'Doom', function(rendered) {
        // add further handling for images, sizes, etc.
       
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

    process.on('unhandledRejection', (reason, promise) => {
        console.log('Unhandled Rejection: ', reason.stack || reason);
    })
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