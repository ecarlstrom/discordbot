const config = require('dotenv').config();

module.exports = async message => {
    let client = message.client;
    try {
        if(message.author.bot) {
            return;
        }

        if(message.author.id === client.user.id) {
            return;
        }

        if(!message.content.startsWith(process.env.prefix)) {
            return;
        }

        let command = message.content.split(' ')[0].slice(process.env.prefix.length);
        let params = message.content.split(' ').slice(1);
        let perms = client.elevation(message);

        message.author.permLevel = perms;

        let cmd;
        if(client.commands.has(command)) {
            cmd = client.commands.get(command);
        } else if(client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command));
        }

        if(cmd) {
            if(perms < cmd.conf.permLevel) {
                return;
            }

            cmd.run(client, message, params, perms);
        }
        } catch(err) {
            console.log(err.stack || err)
            return;
        }

        process.on('unhandledRejection', (reason, promise) => {
            console.log('Unhandled Rejection: ', reason.stack || reason);
        })
};