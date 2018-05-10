const Discord = require('discord.js')
const emojis = require('../../utils/emojis')

/**
 * 
 * @param {Discord.TextChannel} channel 
 * @param {string} text 
 * @param {Array.<string>} reactions 
 * @param {Discord.User} user
 */
async function confirmReaction(channel, text, emojis, user) {
  const message = await channel.send(text)
  const filter = (r, u) => emojis.indexOf(r.emoji.name) !== -1 && u.id === user.id
  // await reactions as soon as possible since the user could react before all possible reactions are dispatched
  const reactionsPromise = message.awaitReactions(filter, { max: 1 })

  // prepare possible reactions
  for (let i = 0; i < emojis.length; i++)
    await message.react(emojis[i])

  
  const reactions = await reactionsPromise
  // delay removal of reactions to give priority to next actions
  setTimeout(() => removeOwnReactions(message), 500)

  return reactions.first()
}

/**
 * Resolves to true if user reacted with THUMB_UP
 * @param {Discord.TextChannel} channel 
 * @param {string} text 
 * @param {Discord.User} user 
 * @return {bool}
 */
confirmReaction.simpleConfirm = async (channel, text, user) => {
  const reaction = await confirmReaction(channel, text, [emojis.THUMB_UP, emojis.THUMB_DOWN], user)
  return reaction.emoji.name === emojis.THUMB_UP
}


module.exports = confirmReaction


/** @param {Discord.Message} message */
async function removeOwnReactions(message) {
  for (let [key, reaction] of message.reactions) {
    await reaction.remove()
  }
}