const config = require('dotenv').config();

module.exports = async (client) => {
   
    console.log('Ready!');

    client.user.setActivity(`!help | ${process.env.musicPrefix}help`);
};