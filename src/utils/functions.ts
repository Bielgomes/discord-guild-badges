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

export async function fetchImageAndTransformToBase64(url: string) {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new Error('Cannot get image')
  }

  const arrayBuffer = await response.arrayBuffer()
  const imageBase64 = `data:image/svg+xml;base64,${Buffer.from(arrayBuffer).toString('base64')}`

  return imageBase64
}
