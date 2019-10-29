# Changelog

**October 28, 2019**

- Ability to add channel/server announcements will hopefully be coming within the week.

**October 26, 2019**

- Added the `!headpat` command as per server request.

- Updated some packages that will hopefully improve stability.

**October 24, 2019**

- Continuing to test some stability and reboot command fixes. General stability seems to have improved over the last two weeks, still ironing out some of the crash causes.

**October 14, 2019**

- Still testing the recent fixes to stability. Too early for anything conclusive but general performance since those changes were pushed has been promising.

**October 13, 2019**

- Small oversight fixed: the `!stop` command now requires the command user to be in the same voice channel as the bot.

**October 11, 2019**

- New version released with recent updates including search term list increase, resource allocation and stability improvements, and better error messages.

**October 8, 2019**

- The `!weather` command has been updated so that it returns a properly-formatted error notification in the event that a location has not been input.

**October 7, 2019**

- Updated some command handler resource usage that should hopefully help to prevert resource allocation issues that lead to errors.

**October 2, 2019**

- The number of results from the `!search` command has been increased from 5 to 10.

**September 28, 2019**

- Lowered permission requirements for the `!reboot` command so that super mods and admins will be able to use it when necessary.

**September 21, 2019**

- Added a simple fix for cases where `!volume` is used with no value and no song currently playing that occasionally crashed the bot. Users will now receive a message saying that there's no music playing whether they use the command with or without a value.

**September 19, 2019**

- Added a fix for the `!fellas` command stopping the music queue and/or crashing the bot if it's used while a music queue is playing. This will work for now until I figure out whether or not there's a way to pause the queue, play the clip, then resume the queue.

**September 15, 2019**

- The `!list` and `!listnames` commands have been moved to their own command files and will now show up properly when using `!help`.

**September 9, 2019**

- I've temporarily made the `!skip` command into a simplified version that doesn't require a vote system while I figure out why the voting was causing the command to act strangely. That's still an immediate plan and this is a temporary workaround so people can skip one song without having to redo the queue.

- Added the `!fellas` command per server request that will play a short (two-second) audio clip in the voice channel. Do not use this while music is playing at the moment until I can get the music queue to play nicely with a separate audio dispatcher. If the command is used with a music queue of any size playing, it will currently end the queue.

**September 2, 2019**

- Playback issues seem to have finally been fixed! I'm keeping a close eye on this in particular, but for now I've had enough hours of testing with and without other people queueing songs to declare this fix a success.

- Rather than cause an error, the `!list` and `!listnames` commands will now split responses into multiple embeds in the event the result exceeds 2,000 characters.

- The date displayed at the top of the `!forecast` command now correctly indicates the date for the Monday of the current week.

**September 1, 2019**

- The `!ascii` crash bug has been fixed. A proper error message will be added soon but for now the bot simply skips input that it cannot format (e.g. `!ascii <emoji>`)) and awaits the next command.

**August 28, 2019**

- Removed the permission level requirement for the `!reload` command. Users will not have to wait for an admin to run this command anymore.

- User-selected volumes now persist through the entire queue or until changed. Volume no longer automatically resets to 20% at the beginning of each queue entry.

**August 22, 2019**

- Added simple fix to address the `!<space>anyword` format returning a delete message error. Testing further but the error no longer appears for now.

**August 13, 2019**

- Added basic `!ascii` command.

- The `!m` prefix has been removed. Music commands will now use the same prefix as other commands.

**August 10, 2019**

- Fixed the `!mvolume/!mvol` command so it will correctly handle non-numerical arguments.