import { makeCompactCard, makeDefaultCard } from '@/utils/cards.ts'
import { fetchImageAndTransformToBase64 } from '@/utils/functions.ts'

interface CreateCardInput {
  mode: 'default' | 'compact'

  guildName: string
  guildIconUrl: string | null
  guildBannerUrl: string | null
  guildOnlineMemberCount: number
  guildMemberCount: number

  textColor: string | undefined
  statsTextColor: string | undefined
  backgroundColor: string | undefined
  iconBorderColor: string | undefined
  iconBorderRadius: number | undefined
  borderRadius: number | undefined

  buttonColor: string | undefined
  buttonText: string | undefined
  buttonTextColor: string | undefined
  buttonBorderRadius: number | undefined
}

const FALLBACK_ICON_URL = 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
const FALLBACK_BANNER_URL = 'https://i.imgur.com/WcIB4vh.jpeg'

export async function createCard({
  mode,

  guildName,
  guildIconUrl,
  guildBannerUrl,
  guildOnlineMemberCount,
  guildMemberCount,

  textColor,
  statsTextColor,
  backgroundColor,
  iconBorderColor,
  iconBorderRadius,
  borderRadius,

  buttonColor,
  buttonText,
  buttonTextColor,
  buttonBorderRadius,
}: CreateCardInput) {
  const iconInBase64 = await fetchImageAndTransformToBase64(
    guildIconUrl || FALLBACK_ICON_URL
  )

  if (mode === 'compact') {
    const { card } = await makeCompactCard({
      icon: iconInBase64,
      guildName,
      onlineMembersCount: guildOnlineMemberCount,
      membersCount: guildMemberCount,

      textColor,
      statsTextColor,
      backgroundColor,
      iconBorderColor,
      iconBorderRadius,
      borderRadius,

      buttonColor,
      buttonText,
      buttonTextColor,
      buttonBorderRadius,
    })

    return {
      card,
    }
  }

  const bannerInBase64 = await fetchImageAndTransformToBase64(
    guildBannerUrl || FALLBACK_BANNER_URL
  )

  const { card } = await makeDefaultCard({
    icon: iconInBase64,
    banner: bannerInBase64,
    guildName,
    onlineMembersCount: guildOnlineMemberCount,
    membersCount: guildMemberCount,

    textColor,
    statsTextColor,
    backgroundColor,
    iconBorderColor,
    iconBorderRadius,
    borderRadius,

    buttonColor,
    buttonText,
    buttonTextColor,
    buttonBorderRadius,
  })

  return {
    card,
  }
}
