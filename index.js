require('dotenv').config()

const discordBot = require('./discord')(process.env.DISCORD_BOT_TOKEN)