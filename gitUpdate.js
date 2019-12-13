import { exec } from "child_process";
import { pathToFileURL } from "url";

const config = require('dotenv').config();

// should keep the bot updated with the git repo
// will add into commands folder when work is done so it doesn't cause an issue with current command loading on boot

// need in config: Git username, password, repo URL
// git info now added to config, testing variables
// 12/12: git config credentials updated

const {
    exec
} = require('child_process');
const path = require('path');
const {
    URL
} = require('url');

const {
    run: reboot
} = require('./reboot');
// possibly separate config for this file

exports.run = async(client, message, args) => {
    // add git config info
    const gitURL = new URL(config.gitURL);
    gitURL.password = config.gitPass;
    gitURL.username = config.gitHandle;

        exec(`git pull ${gitURL}`, {
            cwd: pathToFileURL.join(__dirname, '../')
        }, async(err, stdout, stderr) => {
            if(err) {
                return console.error(err);
            }

            const out = [];
            if(stdout) {
                out.push(stdout);
            }
            if(stderr) {
                out.push(stderr);
            }

            await message.channel.sendMessage(`\`\`\`${out.join('```\n```')}\`\`\``);
            return reboot(client, message, args);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 10
};

exports.help = {
    name: 'gitUpdate',
    description: 'Updates bot from Git repo. Only usable by bot creator.',
    usage: 'gitUpdate'
};