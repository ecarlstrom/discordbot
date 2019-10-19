module.exports = async client => {
    // test auto-reconnect on process kill?
    try {
        console.log('Reconnecting!');
    }catch(err) {
        return;
    }
};