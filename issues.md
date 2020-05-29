# Known Issues

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the headpat command.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- The bot can sometimes get stuck in a voice channel if a user tries to queue up a > 15 minute song without sufficient privileges. This can cause queues to become stuck. I'll fix this so that the bot leaves after joining in such a case if there's no queue, or simply skipping the entry otherwise.

- The `!stats` command seems to be displaying results incorrectly. The current command returns the total number of songs that have been queued during a particular session rather than the intended results, which is the current queue size.

- Using the `!ascii` command with invalid inputs can cause the bot to crash. (working on fix as of 3/28/2020)

- Investigating an issue that causes the bot to reconnect repeatedly. Minor for now since performance is not impacted thus far.

- Looking into an occasional playback issue after the first song after an auto-reconnect. (5/20)

- Bot can occasionally crash if a song is queued right as the previous queue ends.

- Identified a bug with two playback dependencies that causes some occasional instability with Youtube playback. Working on a fix for this at the moment.