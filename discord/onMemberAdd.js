const Discord = require('discord.js')
const greetUser = require('./commands/greetUser')

/** @param {Discord.Client} client */
module.exports = (client) => {
    client.on('guildMemberAdd', /** @type {Discord.GuildMember} */ async member => {
        await greetUser(member)
    })
}