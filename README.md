# Rawboot

## General Information

Rawboot is a general-purpose Discord bot intended to equip servers with a wide variety of functions including general chat moderation, music playback, current weather conditions and forecasts, and integration with popular game APIs to return player stats and other commonly sought information. As of this writing (8/11/2019) music and weather commands have been created along with some basic chat moderation tools, with the most immediate plans being the expansion of chat moderation capabilities including ban, kick, unban, and warnings.

Information on current commands and plans for improvement can be found further down in this readme and bot changes along with their dates can also be found in this repo in the changelog.md file. I have no current plans to create a website for this bot seeing as it's still a small-scale project, so this repo is the best place to stay up to date. The changelog file should be updated fairly often as new features and fixes are pushed.

## General Commands

### Weather

- The `!w <location>` command is used for current weather conditions at a given location. The bot accepts full city names, abbreviations, and ZIP codes to find location, e.g. `!w New York` and `!w ny` both return the weather for New York City and one of its many ZIP codes can be used for a slightly more specific scope.

- The `!forecast <location>` command provides a five-day weekday forecast for the current week at a given location. This command also accepts a variety of inputs to find location. At the time of this writing the API only returns weekday information, but I'm looking into ways to make weekend data available.

## Music Commands

### Please note that unlike other commands, the !m music prefix does not use a space between prefix and command. Users must be in a voice channel to use music commands.

- First mention goes to `!mhelp`, which provides all the information in this section in an easy-to-read embed format. In the future this will also provide aliases and abbreviations for commands, e.g. `!mvol` working in the same way that the full `!mvolume` command does.

- The `!mpause/!mp` command pauses the current song playback. This is not a skip command so the queue is unaffected, just a simple pause button.

- The `!mping` command pings the Discord server and relays the time elapsed with a standard "ping/pong" feedback format. This command will be taken out of the music command section in the future and placed with general commands.

- The `!mplay <item to play>` is the command to initiate playback. This command accepts YouTube links (in either youtube.com or youtu.be formats) and can also play a search term. Note that the search term is the first result so specificity is helpful; `!mplay Debussy Arabesque No. 1` is considerably more likely to return the desired result than `!mplay arabeseque`.

- The `!mqueue` command shows a list of currently queued songs in the order they will be played, with the currently playing song highlighted at the top.

- The `!mreboot` command reboots the bot in the event of any issues or changes. This command can only be used with sufficient server privileges, so most users will not have access to it.

- The `!mreload <commandname>` command is similar to rebooting but is used to reload an individual command. This can be used by all server privilege levels and will likely fix any problems before an `!mreboot` becomes necessary.

- The `!mresume/!mr` command is used to resume playback after it has been paused with `!mpause/!mp`. As with the pause command, this has no effect on queue position or playback order.

- The `!msearch <term>` command is used to return the top 5 YouTube search results for the provided term. This will provide both video titles and direct links, making usage with the `!mplay` command straightforward.

- The `!mskip` command initiates a vote to skip the currently playing song. Users have a ten-second window in which to vote and the song is skipped if a majority of users in the voice channel vote to skip. In the event that the number of voice channel users is one or two, a single `!mskip` is sufficient.

- The `!mstats` command provides current information on the number of servers using the music queue. Returns the number of songs queued and the number of servers queueing songs.

- The `!mstop` command is used to stop the entire queue. It is important to note that this not only stops the current song but clears all queue entries as well.

- The `!mvolume/mvol <number>` command is used to set the playback volume of the current song to a percentage between 0 and 100. Default playback volume is 20%. The command will provide error messages for non-numerical feedback and numbers out of range, but decimal values (e.g. `!mvol 55.7` are allowed.

## Game Commands

Will be added as they become available.

* Future plans

To be updated soon.

* Feedback

Please feel free to contact me at evan.carlstrom@gmail.com with any issues or feedback!