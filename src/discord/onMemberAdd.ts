import { Client, GuildMember } from 'discord.js'
const greetUser = require('./commands/greetUser')

export const onMemberAdd = (client: Client) => {
    client.on('guildMemberAdd', async (member: GuildMember) => {
        await greetUser(member)
    })
}