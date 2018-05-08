const Discord = require('discord.js')
const emojis = require('../../utils/emojis')
const confirmReaction = require('../utils/confirmReaction')
const tmpl = require('../../utils/tmpl')

const roles = {
  [emojis.numbers[1]]: 'Artist',
  [emojis.numbers[2]]: 'Audio',
  [emojis.numbers[3]]: 'Designer',
  [emojis.numbers[4]]: 'Learner',
  [emojis.numbers[5]]: 'Programmer',
  [emojis.numbers[6]]: 'Promoter (YouTuber, Twitcher, Blogger, etc.)',
  [emojis.numbers[7]]: 'Tester (for who simply wants to play some great games)'
}

const rolesEmojis = Object.keys(roles)

const skills = [
  'C++',
  'C#',
  'Unity',
  'Unreal'
]

const texts = {
  welcome: ['Hello {username} and welcome to the Classy Games Dev Team. I’m a bot setup to help you easily transition to our wonderful server.',
    'Firstly, a little bit about our server. The server was set up to help bring all roles within game development together to learn new skills, network with other professionals and collaborate together on amazing projects.',
    'We welcome everyone! From the casual hobbyists to the professional developer, everyone has a place here. We also cater to all game dev roles. From programming to story writing. We all work together to create amazing work.',
    'So now you know a little about the server and roles let’s assign your roles.'
  ].join('\n\n'),

  assignRole: [
    'Each member must have one main role. These are:',
    rolesEmojis.map(e => `${e} - ${roles[e]}`).join('\n'),
    'So tell me. What is your main role in game development?'
  ].join('\n\n')
}

/**
 * 
 * @param {Discord.User} user 
 */
module.exports = async (user) => {
  await user.send(tmpl(texts.welcome, user))

  let confirmed = false
  do {
    const reacted = await confirmReaction(user, texts.assignRole, rolesEmojis, user)
    const reactedEmoji = reacted.emoji.name
    const mainRoleName = roles[reactedEmoji]
    
    await user.send('What are your skills?\n(Type the numbers of the skills space separated)')
    const skillsMessage = await user.send(skills.map((skill, i) => (i+1) + '. ' + skill).join('\n'))
    const skillsReplies = await user.dmChannel.awaitMessages(m => true, { max: 1 })
    const userSkills = skillsReplies.first().content.split(/\D+/)
      .map(d => skills[parseInt(d, 10) - 1])
    
    const confirmText = `So you are a ${mainRoleName} with skills: ${userSkills.join(', ')}, correct?`
    const confirmReacted = await confirmReaction(user, confirmText, [emojis.THUMB_UP, emojis.THUMB_DOWN], user)
    
    if (confirmReacted.emoji.name === emojis.THUMB_UP)
      confirmed = true

  } while (!confirmed)

  await user.send('Roles assigned!')
  await user.send(`Go to <#327956459860000770> and introduce yourself!`)
}

