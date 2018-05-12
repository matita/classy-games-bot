const Discord = require('discord.js')

/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Array.<string>} roleNames 
 */
module.exports = async (member, roleNames) => {
    const roles = roleNames
        .map(r => member.roles.find('name', r))
        .filter(r => r)

    if (!roles.length)
        return

    await member.removeRoles(roles)
}