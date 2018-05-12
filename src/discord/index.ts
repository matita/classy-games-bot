import { Client } from 'discord.js'
import { onMessage } from './onMessage'
import { onMemberAdd } from './onMemberAdd'

export const discord = (token: string): Client => {
    const client = new Client()
    client.on('ready', () => console.log('Bot ready!'))
    
    onMessage(client)
    onMemberAdd(client)

    client.login(token)
    return client
}



