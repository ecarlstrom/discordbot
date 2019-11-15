/////////////////////////////// ***** USER HANDLING ***** ///////////////////////////////

// includes features like greeting new users, kicking, banning, permission handling, etc.

// handles greeting of new users and removes users from the newUsers list if they leave while on it so the greeting
// is not addressed to an invalid user. This won't be necessary for small servers while the message triggers on
// each join, but for larger batches (i.e. newUsers[guild.id].size > 10) it will be useful.

// const newUsers = [];
// maybe test some sort of message trigger here?
// client.on('guildMemberAdd', (member) => {
//   const guild = member.guild;
//   if(!newUsers[guild.id]) newUsers[guild.id] = new Discord.Collection();
//   newUsers[guild.id].set(member.id, member.user);

//   if(newUsers[guild.id].size = 1) {
//     const userlist = newUsers[guild.id].map(u => u.toString()).join(' '); // not necessary for 1, useful for larger servers
//     guild.channels.find(channel => channel.name === 'general').send(`Welcome, ${userlist}!`);
//     newUsers[guild.id].clear();
//   }
// });

// client.on('guildMemberRemove', (member) => {
//   const guild = member.guild;
//   if(newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
// }); // prevents greeting of invalid users if they leave while in the newUsers greeting queue

// kicks user from a voice channel (in kind of an inefficient way for now, will edit later)

// client.on('message', async (message) => {
//   if(!message.guild.me.hasPermission(['MANAGE_CHANNELS', 'MOVE_MEMBERS']))
//     return message.reply('Missing required channel management and/or member moving permission(s).');

//   const user = message.mentions.users.first();
//   const member = message.mentions.members.first();
// // //   // above line stores the @mentioned user, following lines check to make sure
// // //   // there is a mention and that the user is in a voice channel.
//   if(!member) return message.reply('Please @mention a specific user.');
//   if(!member.voiceChannel) return message.reply('Specified user is not in a voice channel.');

//   const temp_voice = await message.guild.createChannel(user.id, 'voice', [
//     { id: guild.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'], },
//     { id: member.id,
//       deny: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK'] }
//   ]);
//   await member.setVoiceChannel(temp_voice);

//   await temp_voice.delete(); // creates temporary voice channel that awaits the
// // //   // mention and then moves the user in before deleting the channel

//   msg.react('👍'); // check with a reaction
// });

//////// testing out some guild-related features to familiarize myself with the issues the voice channel permissions code might be having //////////