const config = require('dotenv').config();

module.exports = async client => {
    // let single = client.guilds.size === 1;
    console.log('Ready!');

    client.user.setActivity(`!help | !mhelp`);
};