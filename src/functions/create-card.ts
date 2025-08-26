import { makeDefaultCard } from '@/utils/cards.ts'
import { fetchImageAndTransformToBase64 } from '@/utils/functions.ts'

interface CreateCardInput {
  guildName: string
  guildIconUrl: string | null
  guildBannerUrl: string | null
  guildOnlineMemberCount: number
  guildMemberCount: number
  buttonMessage: string | undefined
}

export async function createCard({
  guildName,
  guildIconUrl,
  guildBannerUrl,
  guildOnlineMemberCount,
  guildMemberCount,
  buttonMessage,
}: CreateCardInput) {
  const guildIconBase64 = await fetchImageAndTransformToBase64(
    guildIconUrl || 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
  )
  const guildBannerBase64 = await fetchImageAndTransformToBase64(
    guildBannerUrl || 'https://i.imgur.com/WcIB4vh.jpeg'
  )

  const { card } = await makeDefaultCard({
    iconUrl: guildIconBase64,
    bannerUrl: guildBannerBase64,
    guildName: guildName,
    onlineMembersCount: guildOnlineMemberCount,
    membersCount: guildMemberCount,
    buttonMessage,
  })

  return {
    card,
  }
}
