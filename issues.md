# Known Issues

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the headpat command with no arguments given.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- There is some occasional playback difficulty with certain VEVO videos that causes these videos to be skipped entirely. This seems to be out of my control but I'm looking into possible fixes.

- As of 12/19/2019 there is an intermittent issue that causes playback of certain videos to skip. This does not seem to be on the bot's end and is possibly connected to the VEVO playback issues mentioned above. If these issues persist I'm going to try a new playback library since that's where they seem to originate.