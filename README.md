# Classy Games bot
Bot for the Classy Games Discord server

## How to contribute

1. clone this repository on your computer:  
   `git clone https://github.com/matita/classy-games-bot`
2. look at the board at waffle:  
   [![Waffle.io - Columns and their card count](https://badge.waffle.io/matita/classy-games-bot.svg?columns=all)](https://waffle.io/matita/classy-games-bot)
3. check a task in the **To Do** column and drag it on the **In Progress** column to notify other contributors that you're working on it
4. create a branch with a name that starts with the task number (the number in the top left corner of the task) and has a very short description of the task  
   e.g. `3-contributors-guide`
5. do all your work and do how many commits you want (that's your branch, after all)
6. publish your branch on the remote repository and create the pull request putting in the description the word **closes** and the number of the task it fixes preceded by #  
   e.g. `closes #3 - added contributing guide to README.md`  
   This is important in order for Waffle to properly close the task
7. accept critiques and discussions about your pull request, make the edits you're asked (if asked) and enjoy it being merged by the repository
8. your work on the task is done, you can go back to step **2** and work on another task!

## Test your code

You'll likely need to do this just the first time.

1. create your server on Discord if you don't already have one
2. create a test application here: https://discordapp.com/developers/applications/me
3. take note of the Client ID and the Bot Token in the application settings page
4. create a file named `.env` in the root folder of the project with this content  
   ```
   DISCORD_BOT_TOKEN=<your-bot-token>
   DISCORD_CLIENT_ID=<your-client-id>
   PORT=3000
   ```  
   replacing `<your-bot-token>` and `<your-client-id>` with the values you got from the application settings page
5. open a shell on the project root folder and type the command  
   ```
   npm start
   ```
6. head your browser to http://localhost:3000/invite, click the **Invite bot** link and add the bot to your Discord server
7. you now have your bot invited on your server, so go on, test your code!