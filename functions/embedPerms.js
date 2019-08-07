module.exports = (message) => {
    if(!message.guild) {
        return true;
    }

    const binaryAllow = [];
    const binaryDeny = [];
    let allowed;
    let denied;

    if(message.channel.permissionOverwrites.size > 0) {
        
        if(message.channel.permissionOverwrites.has(message.guild.id)) {
            binaryAllow.push(message.channel.permissionOverwrites.get(message.guild.id).allow);
            binaryDeny.push(message.channel.permissionOverwrites.get(message.guild.id).deny);
        }

        if(message.channel.permissionOverwrites.has(message.author.id)) {
            binaryAllow.push(message.channel.permissionsOverwrites.get(message.author.id).allow);
            binaryDeny.push(message.channel.permissionOverwrites.get(message.author.id).deny);
        }

        let roleCount = 0;
        
        message.member.roles.forEach((role) => {
            
            if(message.channel.permissionOverwrites.has(role.id) && role.id !== message.guild.id) {
                binaryAllow.push(message.channel.permissionOverwrites.get(role.id).allow);
                binaryDeny.push(message.channel.permissionOverwrites.get(role.id).deny);
                roleCount++;
            }

            if(roleCount === 1) {
                binaryAllow.shift();
                binaryDeny.shift();
            }
        });

        binaryDeny.some((bin) => {
            let binReverse = (bin >>> 0).toString(2).split('').reverse().join('');

            if(binReverse.charAt(14) === '1') {
                denied = true;
                return true;
            } else {
                denied = false;
            }
        });
        
        binaryAllow.some((bin) => {
            let binReverse = (bin >>> 0).toString(2).split('').reverse().join('');

            if(binReverse.charAt(14) === '1') {
                allowed = true;
                return true;
            } else {
                allowed = false;
            }
        });

        if((allowed) || (!allowed && !denied)) {
            return true;
        }
        return false;
    } else {
        return message.member.hasPermission('EMBED_LINKS');
    }
};