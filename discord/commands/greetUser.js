const Discord = require('discord.js')
const emojis = require('../../utils/emojis')
const confirmReaction = require('../utils/confirmReaction')
const { simpleConfirm } = confirmReaction
const tmpl = require('../../utils/tmpl')
const delay = require('../../utils/delay')
const writeList = require('../../utils/writeList')
const channels = require('../../utils/channels')
const removeRoles = require('../utils/removeRoles')
const assignRoles = require('../utils/assignRoles')

const roles = {
  [emojis.numbers[1]]: { name: 'Artist' },
  [emojis.numbers[2]]: { name: 'Audio' },
  [emojis.numbers[3]]: { name: 'Designer' },
  [emojis.numbers[4]]: { name: 'Learner' },
  [emojis.numbers[5]]: { name: 'Programmer' },
  [emojis.numbers[6]]: { name: 'Promoter', description: '(YouTuber, Twitcher, Blogger, etc.)' },
  [emojis.numbers[7]]: { name: 'Tester', description: '(for who simply wants to play some great games)' }
}

const rolesEmojis = Object.keys(roles)

const skills = [
  'C++',
  'C#',
  'Java',
  'GML',
  'Java Script',
  'Ruby',
  'Blue Print',
  'SFX',
  'Composer',
  'Musician',
  'Pixel Art',
  '3D Modeller',
  'Animator',
  'Concept Art',
  'General Art',
  'Photoshop',
  'Writer',
  'Video Editor'
]

const texts = {
  welcome: ['Hello **{displayName}** and welcome to the **{guild.name}**. I\'m a bot setup to help you easily transition to our wonderful server.',
    'Firstly, a little bit about our server. The server was set up to help bring all roles within game development together to learn new skills, network with other professionals and collaborate together on amazing projects.',
    'We welcome everyone! From the casual hobbyists to the professional developer, everyone has a place here. We also cater to all game dev roles. From programming to story writing. We all work together to create amazing work.',
    'So now you know a little about the server and roles let\'s assign your roles.'
  ].join('\n\n'),

  assignRole: [
    'Each member must have one main role. These are:',
    rolesEmojis.map(e => `${e} - ${roles[e].name} ${roles[e].description || ''}`).join('\n'),
    'So tell me. What is your main role in game development?'
  ].join('\n\n'),

  assignSkills: [
    'Although you can only have 1 main role you can have multiple sub roles/skills.',
    'Please type the corresponding number to which sub roles/skills you have followed by a `,` to separate each number.',
    'For example: I am programmed in `5. JavaScript` and I love `11. Pixel Art`. So I would type:\n```\n5, 11\n```',
    'So what are your sub roles/skills?'
  ].join('\n\n'),

  rolesAssigned: [
    'Great! All of your roles have been assigned.',
    `Please remember to read all our rules at <#${channels.RULES}> and introduce yourself at <#${channels.MEMBER_INFO}> by describing who you are and why you are interested in game dev.`,
    ' Welcome to the server!'
  ].join('\n\n')
}

/**
 * 
 * @param {Discord.GuildMember} member 
 */
module.exports = async (member) => {
  try {
    await member.send(tmpl(texts.welcome, member))

    const mainRoleName = await askMainRole(member)
    const userSkills = await askSkills(member)

    member.user.dmChannel.startTyping()
    await Promise.all([
      member.send('I\'m assigning you the roles you selected'),
      assignMainRole(member, mainRoleName),
      assignSkills(member, userSkills)
    ])
    member.user.dmChannel.stopTyping(true)

    await member.send(texts.rolesAssigned)
  } catch (e) {
    await member.send('Sorry, something bad happened. Please ask <#' + channels.ASK_A_MOD + '> for some help and tell them you had this error during the greeting:\n```\n' + e.message + '\n```')
    e.message = 'Error while greeting **' + member.displayName + '**:\n' + e.message
    throw e
  }
}


/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {string} roleName 
 */
async function assignMainRole(member, roleName) {
  const otherRoles = rolesEmojis
    .map(e => roles[e].name)
    .filter(r => r !== roleName)
  await removeRoles(member, otherRoles)
  return await assignRoles(member, [roleName])
}


/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Array.<string>} skillNames 
 */
async function assignSkills(member, skillNames) {
  return await assignRoles(member, skillNames)
}

/** @param {Discord.GuildMember} user */
async function askMainRole(member) {
  const { user } = member
  do {
    const reacted = await confirmReaction(user, texts.assignRole, rolesEmojis, user)
    const reactedEmoji = reacted.emoji.name
    const mainRole = roles[reactedEmoji]
    const mainRoleName = mainRole.name

    const confirmed = await simpleConfirm(user, `Great! So you are a ${mainRoleName}. Correct?`, user)
    if (confirmed)
      return mainRoleName

  } while (true)
}

/** @param {Discord.GuildMember} member */
async function askSkills(member) {
  const { user } = member
  const skillsTexts = skills.map((s, i) => `${i+1}. ${s}`)
  do {
    const embed = { fields: [{
      name: 'Skills',
      value: skillsTexts.filter((s, i) => i < skills.length / 2).join('\n'),
      inline: true
    }, {
      name: '...',
      value: skillsTexts.filter((s, i) => i >= skills.length / 2).join('\n'),
      inline: true
    }]}
    await user.send(texts.assignSkills, { embed })
    const skillsReplies = await user.dmChannel.awaitMessages(m => true, { max: 1 })
    const userSkills = skillsReplies.first().content.split(/\D+/)
      .map(i => skills[parseInt(i, 10) - 1])
    
    const confirmed = await simpleConfirm(user, `That's great. So your skills are ${writeList(userSkills)}. Is that correct?`, user)
    if (confirmed)
      return userSkills

  } while (true)
}

