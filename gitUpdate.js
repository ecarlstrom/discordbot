import { exec } from "child_process";
import { pathToFileURL } from "url";

// should keep the bot updated with the git repo
// will add into commands folder when work is done so it doesn't cause an issue with current command loading on boot

// need in config: Git username, password, repo URL

// const {
//     exec
// } = require('child_process');
// const path = require('path');
// const {
//     URL
// } = require('url');

// const {
//     run: reboot
// } = require('./reboot');
// possibly separate config for this file

exports.run = async(client, message, args) => {
    // add git config info

        exec(`git pull ${giturlhere}`, {
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
