require('dotenv').config()
require('./utils/mandatoryEnv')([
    'DISCORD_CLIENT_ID',
    'DISCORD_BOT_TOKEN',
    'PORT'
])

const discordBot = require('./discord')(process.env.DISCORD_BOT_TOKEN)

const webServer = require('./express')({ 
    discordClientId: process.env.DISCORD_CLIENT_ID, 
    port: process.env.PORT
})