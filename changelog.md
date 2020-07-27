# Changelog

**July 27, 2020**

- Patches a couple of DoS exploit vulnerabilities present in various packages.

**June 2, 2020**

- Playback issues have been solved!

**June 1, 2020**

- Testing a fix for recent playback errors, build seems stable so far and works correctly.

**May 29, 2020**

- Updates to playback dependencies to fix some of the errors in object data retrieval.

**May 23, 2020**

- Properly rounded values are now displayed after `!vol up` and `!vol down` are used. All other values should remain the same and display correctly.

**April 17, 2020**

- Updating some playback dependencies for more accurate Youtube data.

**April 10, 2020**

- Occasional playback issues with `!skip` and `!stop` seem to be fixed.

**April 9, 2020**

- A couple more ASCII art package updates for security.

**April 4, 2020**

- Potentially exploitable vulnerability in a dependency has been patched.

**April 3, 2020**

- General package upgrades and maintenance. Potential security vulnerabilities in a couple of dependencies have been patched.

**March 21, 2020**

- General package upgrades and maintenance.

**March 17, 2020**

- Only users in the same voice channel as the bot can add songs to the queue.

**March 10, 2020**

- General updates, League API access renewed for future work.

**Feburary 25, 2020**

- General package upgrades and maintenance.

**February 16, 2020**

- All ASCII art dependencies have been updated. This update also addresses some minor security concerns with those dependencies.

**February 11, 2020**

- `!vol up` and `!vol down` have been added. Still working out a minor issue with this but the command are working properly.

**January 24, 2020**

- General package upgrades.

**January 21, 2020**

- Latest small update has been pushed to the live version. This includes improved loading and reloading of commands, `!ascii` stability updates, and the addition of a couple of command aliases for convenience.

**January 19, 2019**

- Additional package updates that should help the stability of the `!ascii` command.

**January 18, 2020**

- Added the `!counterstrike` command as per server request.

**January 9, 2020**

- Bot loading and reloading times have been improved.

**January 3, 2020**

- New bot version released! Playback issues fixed and general improvements to stability have been made.

**January 2, 2020**

- All playback issues seem to have been fixed and YouTube audio is working correctly on all tests. The latest stable version of the bot with these changes will be released tomorrow.

**December 31, 2019**

- Happy new year! Nothing changing today.

**December 30,2019**

- Some more (hopefully final) package updates. Next released is scheduled for this Friday, 1/3/2020.

**December 24, 2019**

- Getting together some final changes for the next bot version that should hopefully come within the week. This update should fix the recent playback issues and make some other general improvements that will be detailed upon release.

**December 23, 2019**

- Continuing package updates. There are two newly introduced ones in particular that seem to be causing the issues, but I'm getting closer to a solution.

**December 20, 2019**

- Updated some packages and dependencies that seem to be causing the intermittent playback issues on certain videos.

**December 13, 2019**

- Currently working on implementing a command that will update the bot directly from its Git repo in the event automatic updates and/or reboots fail. This will only be available to the highest level users but should provide another update option should the other methods fail.

**November 30, 2019**

- Default volume now 70 percent.

**November 20, 2019**

- Default playback volume is now 75 percent. The recent bot volume overhaul from Discord caused playback to be rather quiet and this is a change to compensate.

**October 30, 2019**

- A few more minor package updates and cleanups to improve stability.

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