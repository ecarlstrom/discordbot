# Known Issues

- Music playback is occasionally choppy and cuts off early. Investigating the cause of these issues. (seems to be fixed after 8/30 changes, leaving this up just in case)

- `!skip` command can act strangely, including not tallying votes properly and getting stuck looping the "Sorry, no one voted!" reply even if votes were cast.

- Using any command with a space between the prefix and command (e.g. `! help`, `! play music`) triggers the delete command with no arguments given.

- The date given by the `!forecast` command is not always the correct one. It should return the date of the Monday in the current forecasted week. (tentative fix created 8/29, will monitor next week to see if it still works)

- Using the `!ascii` command with certain non-text input such as emoji causes an error that crashes the bot.

- The `!list` and `!listnames` commands are unable to return messages for servers with many emojis due to Discord's 2,000 character limit. Looking into splitting messages and returning this way.