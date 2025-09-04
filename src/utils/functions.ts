// src/utils/functions.ts

import type { Guild } from 'discord.js'
import { FetchImageError } from '@/functions/errors/fetch-image-error.ts'

export function getOnlineMembersCount(guild: Guild) {
  const guildOnlineMemberCount = guild.members.cache.filter(
    member =>
      member.presence?.status === 'online' || member.presence?.status === 'idle'
  ).size

  return guildOnlineMemberCount
}

export async function fetchImageAndTransformToBase64(url: string) {
  const response = await fetch(url)

  if (response.status !== 200) {
    throw new FetchImageError()
  }

  const contentType = response.headers.get('content-type')

  const arrayBuffer = await response.arrayBuffer()
  const imageBase64 = `data:${contentType};base64,${Buffer.from(
    arrayBuffer
  ).toString('base64')}`

  return imageBase64
}

export function sanitizeString(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
