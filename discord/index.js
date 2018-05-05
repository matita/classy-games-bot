const Discord = require('discord.js')
const handleMessages = require('./onMessage')

module.exports = (token) => {
    const client = new Discord.Client()
    client.on('ready', () => console.log('Bot ready!'))
    
    handleMessages(client)

    client.login(token)
    return client
}



