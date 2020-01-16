# Known Issues

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the headpat command with no arguments given.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- There is some occasional playback difficulty with certain VEVO videos that causes these videos to be skipped entirely. This seems to be out of my control but I'm looking into possible fixes.

- The bot can sometimes get stuck in a voice channel if a user tries to queue up a > 15 minute song without sufficient privileges. This doesn't cause any playback or crashing issues, but I'll fix this so that the bot leaves after joining in such a case.