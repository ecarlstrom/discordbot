module.exports = async client => {
    try {
        console.log('Disconnected!');
        process.exit();
    }catch(err) {
        return;
    }
};