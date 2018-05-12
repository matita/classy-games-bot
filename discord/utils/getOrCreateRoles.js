const Discord = require('discord.js')

/**
 * @param {Discord.Guild} guild
 * @param {Array.<string>} roleNames
 */
module.exports = async (guild, roleNames) => {
    const missingRoles = roleNames.filter(n => !guild.roles.find('name', n))
    if (missingRoles.length)
        await Promise.all(missingRoles.map(name => guild.createRole({ name })))

    return roleNames.map(n => guild.roles.find('name', n))
}