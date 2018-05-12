const Discord = require('discord.js')
const onMessage = require('./onMessage')
const onMemberAdd = require('./onMemberAdd')

module.exports = (token) => {
    const client = new Discord.Client()
    client.on('ready', () => console.log('Bot ready!'))
    
    onMessage(client)
    onMemberAdd(client)

    client.login(token)
    return client
}



