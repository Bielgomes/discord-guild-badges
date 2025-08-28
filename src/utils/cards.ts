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

interface MakeCompactCardInput {
  icon: string | null
  guildName: string
  onlineMembersCount: number
  membersCount: number

  textColor: string | undefined
  statsTextColor: string | undefined
  backgroundColor: string | undefined
  iconBorderColor: string | undefined
  borderRadius: number | undefined

  buttonColor: string | undefined
  buttonText: string | undefined
  buttonTextColor: string | undefined
  buttonBorderRadius: number | undefined
}

export async function makeCompactCard({
  icon,
  guildName,
  onlineMembersCount,
  membersCount,

  textColor = 'FFFFFF',
  statsTextColor = 'BCC0C0',
  backgroundColor = '141414',
  iconBorderColor,
  borderRadius = 4,

  buttonColor = '00863A',
  buttonText = 'Join',
  buttonTextColor = 'FFFFFF',
  buttonBorderRadius = 6,
}: MakeCompactCardInput) {
  const slicedGuildName =
    guildName.length > 22 ? `${guildName.slice(0, 22)}...` : guildName
  const slicedButtonText =
    buttonText.length > 47 ? `${buttonText.slice(0, 47)}...` : buttonText

  const formattedOnlineMembersCount = numberFormatter.format(onlineMembersCount)
  const formattedMembersCount = numberFormatter.format(membersCount)

  const defaultPadding = 15
  const onlineMembersCountText = `${formattedOnlineMembersCount} online`

  const charWidth = 7
  const onlineMembersWidth = onlineMembersCountText.length * charWidth

  const totalMembersStartX = defaultPadding + onlineMembersWidth + 92

  const card = `
    <svg width="388" height="121" fill="#${backgroundColor}" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}
      <defs>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="17" y="17" rx="10" ry="10" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" rx="${borderRadius}" ry="${borderRadius}" />

      <rect width="54" height="54" x="15" y="15" rx="11" ry="11" fill="#${iconBorderColor || backgroundColor}" />
      <image width="50" height="50" x="17" y="17" clip-path="url(#iconClip)" href="${icon}" />

      <text x="77" y="40" font-weight="bold" font-size="20" fill="#${textColor}" letter-spacing="-0.5">${slicedGuildName}</text>
      <g fill="#${statsTextColor}">
        <circle cx="82" cy="54" r="4" fill="#43A25A"/>
        <text x="89" y="59" letter-spacing="-0.5">${onlineMembersCountText}</text>

        <circle cx="${totalMembersStartX - 7}" cy="54" r="4" fill="#BCC0C0" />
        <text x="${totalMembersStartX}" y="59" letter-spacing="-0.5">${formattedMembersCount} members</text>
      </g>

      <g>
        <rect width="358" height="30" x="15" y="80" rx="${buttonBorderRadius}" ry="${buttonBorderRadius}" fill="#${buttonColor}" />
        <text width="358" height="30" x="195" y="96" text-anchor="middle" dominant-baseline="middle" font-weight="600" font-size="14" letter-spacing="-0.5" word-spacing="1.2" fill="#${buttonTextColor}">${slicedButtonText}</text>
      </g>
    </svg>
  `.trim()

  return {
    card,
  }
}

interface MakeDefaultCardInput extends MakeCompactCardInput {
  banner: string | null
}

export async function makeDefaultCard({
  icon,
  banner,
  guildName,
  onlineMembersCount,
  membersCount,

  textColor = 'FFFFFF',
  statsTextColor = 'BCC0C0',
  backgroundColor = '141414',
  iconBorderColor,
  borderRadius = 4,

  buttonColor = '00863A',
  buttonText = 'Join',
  buttonTextColor = 'FFFFFF',
  buttonBorderRadius = 6,
}: MakeDefaultCardInput) {
  const slicedGuildName =
    guildName.length > 23 ? `${guildName.slice(0, 23)}...` : guildName
  const slicedButtonText =
    buttonText.length > 40 ? `${buttonText.slice(0, 40)}...` : buttonText

  const formattedOnlineMembersCount = numberFormatter.format(onlineMembersCount)
  const formattedMembersCount = numberFormatter.format(membersCount)

  const defaultPadding = 15
  const onlineMembersCountText = `${formattedOnlineMembersCount} online`

  const charWidth = 7
  const totalOnlineMembersWidth = onlineMembersCountText.length * charWidth

  const totalMembersStartX = defaultPadding + totalOnlineMembersWidth + 30

  const card = `
    <svg width="342" height="194" fill="#${backgroundColor}" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}
      <defs>
        <clipPath id="bannerClip">
          <rect width="100%" height="60" x="0" y="0" rx="${borderRadius}" ry="${borderRadius}" />
          <rect width="100%" height="30" x="0" y="30" />
        </clipPath>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="18" y="35" rx="10" ry="10" />
        </clipPath>
      </defs>
      <rect width="100%" height="100%" rx="${borderRadius}" ry="${borderRadius}" />

      <image width="100%" height="60" x="0" y="0" clip-path="url(#bannerClip)" preserveAspectRatio="xMidYMid slice" href="${banner}" />

      <rect width="54" height="54" x="16" y="33" rx="11" ry="11" fill="#${iconBorderColor || backgroundColor}" />
      <image width="50" height="50" x="18" y="35" clip-path="url(#iconClip)" href="${icon}" />

      <text x="15" y="111" font-weight="bold" font-size="20" fill="#${textColor}" letter-spacing="-0.5">${slicedGuildName}</text>
      <g fill="#${statsTextColor}">
        <circle cx="20" cy="126" r="4" fill="#43A25A"/>
        <text x="27" y="131" letter-spacing="-0.5">${onlineMembersCountText}</text>

        <circle cx="${totalMembersStartX - 7}" cy="126" r="4" fill="#BCC0C0" />
        <text x="${totalMembersStartX}" y="131" letter-spacing="-0.5">${formattedMembersCount} members</text>
      </g>

      <rect width="312" height="30" x="15" y="150" rx="${buttonBorderRadius}" ry="${buttonBorderRadius}" fill="#${buttonColor}" />
      <text width="312" height="30" x="171" y="165" text-anchor="middle" dominant-baseline="middle" font-weight="600" font-size="14" letter-spacing="-0.5" word-spacing="1.2" fill="#${buttonTextColor}">${slicedButtonText}</text>
    </svg>
  `.trim()

  return {
    card,
  }
}
