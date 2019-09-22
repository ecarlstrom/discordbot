# Known Issues

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the delete command with no arguments given.

- Not entirely sure this is possible, but I'm going to find out if it's possible to make the `!fellas` command usable while a music queue is playing.

- The `!list/!listnames` commands are split into multiple embeds, so sometimes there is one emoji that begins in one and ends in another if the first embed reaches its character limit. I'll try and adjust this so if an emoji will hit the character limit it will roll over to the next embed so it can be displayed properly.

- Using `!vol` with no volume value and without a song playing can cause the bot to crash. (testing 9/21 fix)