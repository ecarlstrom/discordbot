# Known Issues

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the delete command with no arguments given.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- Certain playback issues such as a song not playing correctly or inputs being entered in rapid succession can cause the bot to freeze and require a reboot before music playback is restored, looking into this. (testing the fix on 10/13 release currently)

- Most of the current (10/19) crashes seem to be related to a particular package rather than any of the code, so I'm investigating ways to fix this. (10/29 update: stability has been much better recently so I'm hopeful this will be fully fixed shortly) 