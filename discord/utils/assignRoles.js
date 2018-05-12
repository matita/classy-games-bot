const Discord = require('discord.js')

/**
 * 
 * @param {Discord.GuildMember} member 
 * @param {Array.<string>} roleNames 
 */
module.exports = async (member, roleNames) => {
    const { guild } = member
    const rolesToApply = await Promise.all(roleNames.map(async r => guild.roles.find('name', r) || await guild.createRole({ name: r })))
    const missingRoles = rolesToApply.filter(r => !member.roles.get(r.id))
    if (!missingRoles.length)
        return
    await member.addRoles(missingRoles)
}