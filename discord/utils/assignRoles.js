const Discord = require('discord.js')
const getOrCreateRoles = require('./getOrCreateRoles')

/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Array.<string>} roleNames 
 */
module.exports = async (member, roleNames) => {
    const { guild } = member
    const roles = await getOrCreateRoles(guild, roleNames)
    const missingRoles = roles.filter(r => !member.roles.get(r.id))
    if (!missingRoles.length)
        return member
    return member.addRoles(missingRoles)
}