const Discord = require('discord.js')
const randomReply = require('./commands/randomReply')
const greetUser = require('./commands/greetUser')


/** @param {Discord.Client} client */
module.exports = (client) => {
    client.on('message', async message => {
        if (!message.isMentioned(client.user))
            return

        const text = message.content.replace(`<@${client.user.id}>`, '').trim()
        const parts = text.split(/\s+/)
        const command = parts[0] && parts[0].toLowerCase()

        try
        {
            switch (command) {
                case 'greetme':
                    await greetUser(message.author)
                    break

                default:
                    await randomReply(message)
            }
        } catch (e) {
            message.channel.send('```\n' + e.message + '\n```')
        }
    })
}