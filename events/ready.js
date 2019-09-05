const config = require('dotenv').config();

module.exports = async (client) => {
   try {
    console.log('Ready!');

    client.user.setActivity(`${process.env.prefix}help`);
   }catch(err) {
       return;
   }
};