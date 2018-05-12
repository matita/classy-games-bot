import { GuildMember } from "discord.js";

export const removeRoles = async (member: GuildMember, roleNames: string[]) => {
    const roles = roleNames
        .map(r => member.roles.find('name', r))
        .filter(r => r)

    if (!roles.length)
        return

    await member.removeRoles(roles)
}