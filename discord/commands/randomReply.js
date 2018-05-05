const Discord = require('discord.js')
const shuffle = require('../../utils/shuffle')

let currentReply = 0
let replies = shuffle([
    'hey there',
    'I can\'t do anything at the moment',
    'stop mentioning me, I\'m useless right now',
    'I\'m in development',
    'Don\'t bother me'
])

/** @param {Discord.Message} message */
module.exports = message => {
    if (currentReply >= replies.length) {
        message.reply('I finished stupid things to say')
        currentReply = 0
        shuffle(replies)
        return
    }

    message.reply(replies[currentReply])
    currentReply++
}