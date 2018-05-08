const Discord = require('discord.js')

/**
 * 
 * @param {Discord.TextChannel} channel 
 * @param {string} text 
 * @param {Array.<string>} reactions 
 * @param {Discord.User} user
 */
module.exports = async function confirmReaction(channel, text, emojis, user) {
  const message = await channel.send(text)
  for (let i = 0; i < emojis.length; i++)
    await message.react(emojis[i])

  const filter = (r, u) => emojis.indexOf(r.emoji.name) !== -1 && u.id === user.id
  const reactions = await message.awaitReactions(filter, { max: 1 })
  removeOwnReactions(message)

  return reactions.first()
}


/** @param {Discord.Message} message */
async function removeOwnReactions(message) {
  for (let [key, reaction] of message.reactions) {
    await reaction.remove()
  }
}