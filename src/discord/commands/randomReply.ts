import { Message } from "discord.js";
import { shuffle } from '../../utils/shuffle'

let currentReply = 0
let replies = shuffle([
    'hey there',
    'I can\'t do anything at the moment',
    'stop mentioning me, I\'m useless right now',
    'I\'m in development',
    'Don\'t bother me'
])


export const randomReply =  async (message: Message) => {
    if (currentReply >= replies.length) {
        await message.reply('I finished stupid things to say')
        currentReply = 0
        shuffle(replies)
        return
    }

    await message.reply(replies[currentReply])
    currentReply++
}