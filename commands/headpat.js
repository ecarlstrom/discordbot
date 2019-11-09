exports.run = (client, message) => {
    if(message.content.startsWith(process.env.prefix)) {
        message.reply("<:headpat:637295953925111818>");

        // for reaction
        // const headpatEmoji = message.guild.emojis.find(emoji => emoji.name === "headpat")
        // return message.react(headpatEmoji);
    };

    // can add something for mentioning other users, maybe in a new command?
    // parse the username with a function, e.g.:

    // function retrieveUser(mention) {
    //     if(!mention) {
    //         return;
    //     }

    //     if(mention.startsWith('@') && mention.endsWith('>')) {
    //         mention = mention.slice(2, -1); // to get the ID

    //         if(mention.startsWith('!')) {
    //             mention = mention.slice(1);
    //         }

    //         return client.users.get(mention);
    //     }
    // }

    // the user can be grabbed like so
    // if(message.content.startsWith(process.env.prefix)) {
    //     if(args[0]) {
    //         const user = retrieveUser(args[0]);
    //         // not adding an if(!user) idea here so the base command stays functional
            // mention user here with headpat emoji
    //     }

        // reactions again
        // const headpatEmoji = message.guild.emojis.find(emoji => emoji.name === "headpat")
        // return message.react(headpatEmoji);
    // }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [''],
    permLevel: 0
};

exports.help = {
    name: 'headpat',
    description: 'Headpats the user.',
    usage: 'headpat'
};