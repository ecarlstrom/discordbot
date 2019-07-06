// contains queue and general user permissions for other commands to reference

module.exports = (message) => {
    if(!message.guild) return true;

    const queueAllowed = [];
    const queueDenied = [];
    let willAllow;
    let willDeny;

    if(message.channel.permissionOverwrites.size > 0) {
        if(message.channel.permissionOverwrites.has(message.guild.id)) {
            queueAllowed.push(message.channel.permissionOverwrites.get(message.guild.id).allow);
            queueDenied.push(message.channel.permissionOverwrites.get(message.guild.id).deny);
        }
        if(message.channel.permissionOverwrites.has(message.author.id)) {
            queueAllowed.push(message.channel.permissionOverwrites.get(message.guild.id).allow);
            queueDenied.push(message.channel.permissionOverwrites.get(message.guild.id).deny);
        }

        let roleCount = 0;
        message.member.roles.forEach((role) => {
            if(message.channel.permissionOverwrites.has(role.id) && role.id !== message.guild.id) {
                queueAllowed.push(message.channel.permissionOverwrites.get(role.id).allow);
                queueDenied.push(message.channel.permissionOverwrites.get(role.id).deny);
                roleCount++;
            }
            if(roleCount === 1) {
                queueAllowed.shift();
                queueDenied.shift();
            }
        });
        queueDenied.some((bin) => {
            let binReverse = (bin >>> 0).toString(2).split('').reverse().join('');
            if(binReverse.charAt(14) === '1') {
                willDeny = true;
                return true;
            } else {
                willDeny = false;
            }
        });
        queueAllowed.some((bin) => {
            let binReverse = (bin >>> 0).toString(2).split('').reverse().join('');
            if(binReverse.charAt(14) === '1') {
                willAllow = true;
                return true;
            } else {
                willAllow = false;
            }
        });

        if((allowed) || (!allowed && !denied)) return true;
        return false;
    } else {
        return message.member.hasPermission('EMBED_LINKS');
    }
};