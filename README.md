# Rawboot

## General Information

Rawboot is a general-purpose Discord bot intended to equip servers with a wide variety of functions including general chat moderation, music playback, current weather conditions and forecasts, and integration with popular game APIs to return player stats and other commonly sought information. As of this writing (8/11/2019) music and weather commands have been created along with some basic chat moderation tools, with the most immediate plans being the expansion of chat moderation capabilities including ban, kick, unban, and warnings.

Information on current commands and plans for improvement can be found further down in this readme and bot changes along with their dates can also be found in this repo in the changelog.md file. I have no current plans to create a website for this bot seeing as it's still a small-scale project, so this repo is the best place to stay up to date. The changelog file should be updated fairly often as new features and fixes are pushed.

## General Commands

- First mention goes to `!help`, which provides all the information in this section in an easy-to-read embed format. In the future this will also provide aliases and abbreviations for commands, e.g. `!vol` working in the same way that the full `!volume` command does.

- The `!ping` command pings the Discord server and relays the time elapsed with a standard "ping/pong" feedback format.

- The `!ascii <text>` command returns the input text in ASCII format. Capabilities are currently being expanded and will hopefully handle a wider variety of inputs in the future.

- The `!list` command lists all the custom emoji for the custom server in a small embed that is easy to read.

- The `!listnames` command returns a similar result to `!list` but also includes the name of each emoji. Each row is returned in `<emoji> | <emojiname>` format. This command can return a rather large result for servers with 50+ emoji, so it is recommended to use this sparingly and/or create a separate "Bot Commands" type channel to avoid cluttering chat servers.

- The `!join` command will make the bot join whichever channel the command issuer is currently in.

- The `!boot/!kick` command will make the bot leave the current voice channel. As with `!join`, this can only be used by someone in the voice channel.

- The `!delete <# of messages>` command deletes the specified number of previous messages from the current channel.

- The `!fellas` command has the bot join voice and play a short Hank Hill audio clip before leaving.

- The `!headpat` command will headpat the requester. Will add a way to use it on other people in the future.

- The `!counterstrike/!cs` command will play a popular League of Legends sound clip that likely needs no introduction.

### Weather

- The `!w <location>` command is used for current weather conditions at a given location. The bot accepts full city names, abbreviations, and ZIP codes to find location, e.g. `!w New York` and `!w ny` both return the weather for New York City and one of its many ZIP codes can be used for a slightly more specific scope.

- The `!forecast <location>` command provides a five-day weekday forecast for the current week at a given location. This command also accepts a variety of inputs to find location. At the time of this writing the API only returns weekday information, but I'm looking into ways to make weekend data available.

## Music Commands

### Please note that users must be in a voice channel to use music commands.

- The `!pause/!p` command pauses the current song playback. This is not a skip command so the queue is unaffected, just a simple pause button.

- The `!play <item to play>` is the command to initiate playback. This command accepts YouTube links (in either youtube.com or youtu.be formats) and can also play a search term. Note that the search term is the first result so specificity is helpful; `!play Debussy Arabesque No. 1` is considerably more likely to return the desired result than `!play arabeseque`.

- The `!queue/q` command shows a list of currently queued songs in the order they will be played, with the currently playing song highlighted at the top.

- The `!reboot` command reboots the bot in the event of any issues or changes. This command can only be used with sufficient server privileges, so most users will not have access to it.

- The `!reload <commandname>` command is similar to rebooting but is used to reload an individual command. This can be used by all server privilege levels and will likely fix any problems before an `!reboot` becomes necessary.

- The `!resume/!r` command is used to resume playback after it has been paused with `!pause/!p`. As with the pause command, this has no effect on queue position or playback order.

- The `!search <term>` command is used to return the top 5 YouTube search results for the provided term. This will provide both video titles and direct links, making usage with the `!play` command straightforward.

- The `!skip` command initiates a vote to skip the currently playing song. Users have a ten-second window in which to vote and the song is skipped if a majority of users in the voice channel vote to skip. In the event that the number of voice channel users is one or two, a single `!skip` is sufficient.

- The `!stats` command provides current information on the number of servers using the music queue. Returns the number of songs queued and the number of servers queueing songs.

- The `!stop` command is used to stop the entire queue. It is important to note that this not only stops the current song but clears all queue entries as well.

- The `!volume/vol <number>` command is used to set the playback volume of the current song to a percentage between 0 and 100. Default playback volume is 70 percent. The command will provide error messages for non-numerical feedback and numbers out of range, but decimal values (e.g. `!vol 55.7`) are allowed. Using `!vol` with no value provided will display the current volume.

## Game Commands

Will be added as they become available.

## Upcoming Plans and Improvements

1. The number one planned feature for right now is to add the ability to use the `!search` command results to play something directly from the list. Looking at something like returning each search result with a number and then a simple entry of the number should play the given result.

2. Looking to also add custom server prefix capabilities at some point to avoid any issues with other bots.

3. Expanding the capabilities of the `!ascii` command to format text a little better for larger entries and add image support.

To be updated soon.

## Feedback

Please feel free to contact me at evan.carlstrom@gmail.com with any issues or feedback!