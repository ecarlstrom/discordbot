# Known Issues

- Music playback is occasionally choppy and cuts off early. Investigating the cause of these issues.

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the delete command with no arguments given. (testing 8/22 fix)