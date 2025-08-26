import { makeCompactCard } from '@/utils/cards.ts'
import { fetchImageAndTransformToBase64 } from '@/utils/functions.ts'

interface CreateCompactCardInput {
  guildName: string
  guildIconUrl: string | null
  guildOnlineMemberCount: number
  guildMemberCount: number
  buttonMessage: string | undefined
}

export async function createCompactCard({
  guildName,
  guildIconUrl,
  guildMemberCount,
  guildOnlineMemberCount,
  buttonMessage,
}: CreateCompactCardInput) {
  const guildIconBase64 = await fetchImageAndTransformToBase64(
    guildIconUrl || 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
  )

  const { card } = await makeCompactCard({
    guildName,
    iconUrl: guildIconBase64,
    onlineMembersCount: guildOnlineMemberCount,
    membersCount: guildMemberCount,
    buttonMessage,
  })

  return {
    card,
  }
}
