# Known Issues

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the headpat command.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- The bot can sometimes get stuck in a voice channel if a user tries to queue up a > 15 minute song without sufficient privileges. This can cause queues to become stuck. I'll fix this so that the bot leaves after joining in such a case if there's no queue, or simply skipping the entry otherwise.

- The `!stats` command seems to be displaying results incorrectly. The current command returns the total number of songs that have been queued during a particular session rather than the intended results, which is the current queue size.

- After pausing for long periods of time, the song will play correctly but the subsequent songs in the queue can take 5-10 minutese to being playing. (testing 3/11/20)