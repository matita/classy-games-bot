import { GuildMember } from 'discord.js'
import { getOrCreateRoles } from './getOrCreateRoles'

export const assignRoles =  async (member: GuildMember, roleNames: string[]) => {
    const { guild } = member
    const roles = await getOrCreateRoles(guild, roleNames)
    const missingRoles = roles.filter(r => !member.roles.get(r.id))
    if (!missingRoles.length)
        return member
    return member.addRoles(missingRoles)
}