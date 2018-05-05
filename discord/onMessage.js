const Discord = require('discord.js')
const randomReply = require('./commands/randomReply')


/** @param {Discord.Client} client */
module.exports = (client) => {
    client.on('message', message => {
        if (!message.isMentioned(client.user))
            return

        randomReply(message)
    })
}