module.exports = async client => {
    // test auto-reconnect on process kill?
    // 4/5: bot is functioning normally but reconnecting once or twice every minute, investigating this.
    try {
        console.log('Reconnecting!');
    }catch(err) {
        return;
    }
};