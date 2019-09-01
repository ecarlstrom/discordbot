# Changelog

**September 1, 2019**

- The `!ascii` crash bug has been fixed. A proper error message will be added soon but for now the bot simply skips input that it cannot format (e.g. `!ascii <emoji>`)) and awaits the next command.

**August 28, 2019**

- Removed the permission level requirement for the `!reload` command. Users will not have to wait for an admin to run this command anymore.

- User-selected volumes now persist through the entire queue or until changed. Volume no longer automatically resets to 20% at the beginning of each queue entry.

**August 22, 2019**

- Added simple fix to address the `!<space>anyword` format returning a delete message error. Testing further but the error no longer appears for now.

**August 13, 2019**

- Added basic `!ascii` command.

- The `!m` prefix has been removed. Music commands will now use the same prefix as other commands.

**August 10, 2019**

- Fixed the `!mvolume/!mvol` command so it will correctly handle non-numerical arguments.