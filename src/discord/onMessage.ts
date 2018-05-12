import { Client, Message } from 'discord.js'
import { randomReply } from './commands/randomReply'
import { greetUser } from './commands/greetUser'


export const onMessage = (client: Client) => {
    client.on('message', async (message: Message) => {
        if (!message.isMentioned(client.user))
            return

        const text = message.content.replace(`<@${client.user.id}>`, '').trim()
        const parts = text.split(/\s+/)
        const command = parts[0] && parts[0].toLowerCase()

        try
        {
            switch (command) {
                case 'greet':
                    if (!message.member)
                        await message.reply('you should call this command from a server channel')
                    else
                        await greetUser(message.member)
                    break

                default:
                    await randomReply(message)
            }
        } catch (e) {
            message.channel.send('```\n' + e.message + '\n\n' + e.stack + '\n```')
        }
    })
}