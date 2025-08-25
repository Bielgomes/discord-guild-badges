import type { Guild } from 'discord.js'

export function getOnlineMembersCount(guild: Guild) {
  const guildOnlineMemberCount = guild.members.cache.filter(
    member =>
      member.presence?.status === 'online' || member.presence?.status === 'idle'
  ).size

  return {
    guildOnlineMemberCount,
  }
}
