import { Guild, Role } from 'discord.js'

export const getOrCreateRoles = async (guild: Guild, roleNames: string[]) : Promise<Role[]> => {
    const missingRoles = roleNames.filter(n => !guild.roles.find('name', n))
    if (missingRoles.length)
        await Promise.all(missingRoles.map(name => guild.createRole({ name })))

    return roleNames.map(n => guild.roles.find('name', n))
}