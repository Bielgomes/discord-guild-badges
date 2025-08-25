import { numberFormatter } from './formatters.ts'

const fontImport = `
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&amp;display=swap');
      text {
        font-family: roboto, -apple-system, system-ui, "Segoe UI", sans-serif;
      }
    </style>
  </defs>
`

interface makeDefaultBadgeInput {
  iconUrl: string | null
  bannerUrl: string | null
  guildName: string
  totalOnlineMembersCount: number
  totalMembersCount: number
  buttonMessage: string | undefined
}

export async function makeDefaultBadge({
  iconUrl,
  bannerUrl,
  guildName,
  totalOnlineMembersCount,
  totalMembersCount,
  buttonMessage = 'Join',
}: makeDefaultBadgeInput) {
  const slicedGuildName =
    guildName.length > 23 ? `${guildName.slice(0, 23)}...` : guildName
  const slicedButtonMessage =
    buttonMessage.length > 40
      ? `${buttonMessage.slice(0, 40)}...`
      : buttonMessage

  const formattedTotalOnlineMembersCount = numberFormatter.format(
    totalOnlineMembersCount
  )
  const formattedTotalMembersCount = numberFormatter.format(totalMembersCount)

  const defaultPadding = 15
  const totalOnlineMembersCountText = `${formattedTotalOnlineMembersCount} online`

  const charWidth = 7
  const totalOnlineMembersWidth = totalOnlineMembersCountText.length * charWidth

  const totalMembersStartX = defaultPadding + totalOnlineMembersWidth + 30

  const badge = `
    <svg width="342" height="189" fill="#141414" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}
      <defs>
        <clipPath id="bannerClip">
          <rect width="100%" height="60" x="0" y="0" rx="2" ry="2" />
        </clipPath>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="18" y="35" rx="10" ry="10" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" rx="2" ry="2" />

      <image width="100%" height="60" x="0" y="0" clip-path="url(#bannerClip)" preserveAspectRatio="xMidYMid slice" href="${bannerUrl}" />

      <rect width="54" height="54" x="16" y="33" rx="11" ry="11" fill="#141414" />
      <image width="50" height="50" x="18" y="35" clip-path="url(#iconClip)" href="${iconUrl}" />

      <text x="15" y="106" font-weight="bold" font-size="20" fill="#FFFFFF" letter-spacing="-0.5">${slicedGuildName}</text>
      <g fill="#BCC0C0">
        <circle cx="20" cy="121" r="4" fill="#43A25A"/>
        <text x="27" y="126" letter-spacing="-0.5">${totalOnlineMembersCountText}</text>

        <circle cx="${totalMembersStartX - 7}" cy="121" r="4" />
        <text x="${totalMembersStartX}" y="126" letter-spacing="-0.5">${formattedTotalMembersCount} members</text>
      </g>

      <rect width="312" height="30" x="15" y="145" rx="6" ry="6" fill="#00863A" />
      <text width="312" height="30" x="171" y="160" text-anchor="middle" dominant-baseline="middle" font-weight="600" font-size="14" letter-spacing="-0.5" word-spacing="1.2" fill="#FFFFFF">${slicedButtonMessage}</text>
    </svg>
  `.trim()

  return {
    badge,
  }
}

interface makeCompactBadgeInput {
  iconUrl: string | null
  guildName: string
  totalOnlineMembersCount: number
  totalMembersCount: number
  buttonMessage: string | undefined
}

export async function makeCompactBadge({
  iconUrl,
  guildName,
  totalOnlineMembersCount,
  totalMembersCount,
  buttonMessage = 'Join',
}: makeCompactBadgeInput) {
  const slicedGuildName =
    guildName.length > 22 ? `${guildName.slice(0, 22)}...` : guildName
  const slicedButtonMessage =
    buttonMessage.length > 47
      ? `${buttonMessage.slice(0, 47)}...`
      : buttonMessage

  const formattedTotalOnlineMembersCount = numberFormatter.format(
    totalOnlineMembersCount
  )
  const formattedTotalMembersCount = numberFormatter.format(totalMembersCount)

  const defaultPadding = 15
  const totalOnlineMembersCountText = `${formattedTotalOnlineMembersCount} online`

  const charWidth = 7
  const totalOnlineMembersWidth = totalOnlineMembersCountText.length * charWidth

  const totalMembersStartX = defaultPadding + totalOnlineMembersWidth + 90

  const badge = `
    <svg width="388" height="119" fill="#141414" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}
      <defs>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="15" y="15" rx="10" ry="10" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" rx="2" ry="2" />

      <image width="50" height="50" x="15" y="15" clip-path="url(#iconClip)" href="${iconUrl}" />

      <text x="75" y="38" font-weight="bold" font-size="20" fill="#FFFFFF" letter-spacing="-0.5">${slicedGuildName}</text>
      <g fill="#BCC0C0">
        <circle cx="80" cy="52" r="4" fill="#43A25A"/>
        <text x="87" y="57" letter-spacing="-0.5">${totalOnlineMembersCountText}</text>

        <circle cx="${totalMembersStartX - 7}" cy="52" r="4" />
        <text x="${totalMembersStartX}" y="57" letter-spacing="-0.5">${formattedTotalMembersCount} members</text>
      </g>

      <g>
        <rect width="358" height="30" x="15" y="79" rx="6" ry="6" fill="#00863A" />
        <text width="358" height="30" x="195" y="94" text-anchor="middle" dominant-baseline="middle" font-weight="600" font-size="14" letter-spacing="-0.5" word-spacing="1.2" fill="#FFFFFF">${slicedButtonMessage}</text>
      </g>
    </svg>
  `.trim()

  return {
    badge,
  }
}
