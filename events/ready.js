const config = require('../config.json');

module.exports = async client => {
    let single = client.guilds.size === 1;
    console.log('Ready!');

    client.user.setActivity(`${config.prefix}help | ${client.guilds.size} server${single ? '' : 's'}`);
};