require('dotenv').config()
import { mandatoryEnv } from './utils/mandatoryEnv'

mandatoryEnv([
    'DISCORD_CLIENT_ID',
    'DISCORD_BOT_TOKEN',
    'PORT'
])

import { discord } from './discord'
import { server } from './express'

interface ProcessEnv { [key: string]: string }
declare var process : { env: ProcessEnv }

const discordBot = discord(process.env.DISCORD_BOT_TOKEN)

const webServer = server({ 
    discordClientId: process.env.DISCORD_CLIENT_ID, 
    port: process.env.PORT
})