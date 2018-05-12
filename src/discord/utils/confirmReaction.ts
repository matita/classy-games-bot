import { TextChannel, MessageReaction, User, Message, DMChannel } from "discord.js";
import { emojis } from '../../utils/emojis'


export const confirmReaction = async function (channel: TextChannel | DMChannel, text: string, emojis: string[], user: User) : Promise<MessageReaction> {
  const message = <Message>await channel.send(text)
  const filter = (r: MessageReaction, u: User) => emojis.indexOf(r.emoji.name) !== -1 && u.id === user.id
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
 */
export const simpleConfirm = async (channel: TextChannel | DMChannel, text: string, user: User) : Promise<boolean> => {
  const reaction = await confirmReaction(channel, text, [emojis.THUMB_UP, emojis.THUMB_DOWN], user)
  return reaction.emoji.name === emojis.THUMB_UP
}


async function removeOwnReactions(message: Message) {
  for (let [key, reaction] of message.reactions) {
    await reaction.remove()
  }
}