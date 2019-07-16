const {
    exec
} = require('child_process');
const path = require('path');
const {
    URL
} = require('url');

const {
    run: reboot
} = require('reboot');
const config = require('../config.json');

exports.run = async(client, message, args) => {
    const gitURL = new URL(config.gitURL);
    gitURL.password = config.gitPassword;
    gitURL.username = config.gitUsername;

    exec(`git pull ${gitURL}`, {
        cwd: path.join(__dirname, '../')
    }, async(err, stdout, stderr) => {
        if(err) return console.error(err);

        const out = [];
        if(stdout) out.push(stdout);
        if(stderr) out.push(stderr);

        await message.channel.sendMessage(`\`\`\`${out.join('```\n```')}\`\`\``);

        return reboot(client, message, args);
    });
};
