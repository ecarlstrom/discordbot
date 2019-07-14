// NOTE: this file/command is again not for music playback but rather reboots the bot

exports.run = async (client, message) => {
    message.channel.sendMessage('Are you sure you want to reboot? Enter yes/y for yes, no/n for no, \`cancel\` to abort. Auto-abort in 30 seconds.');

    const valid = ['yes', 'y', 'no', 'n', 'cancel'];
    const collector = message.channel.createCollector(m => m.author.id === message.author.id, { time: 30000 });
    
}