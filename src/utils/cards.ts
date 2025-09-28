import { numberFormatter } from './formatters.ts'
import { sanitizeString } from './functions.ts'

const DEFAULT_PADDING = 15
const CHAR_WIDTH = 7

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

interface RenderStatsInput {
  statsTextColor: string

  onlineMembersX: number
  onlineMembersY: number

  membersX: number
  membersY: number

  onlineMembersCountText: string
  membersCountText: string
}

function renderStats({
  statsTextColor,

  onlineMembersX,
  onlineMembersY,

  membersX,
  membersY,

  onlineMembersCountText,
  membersCountText,
}: RenderStatsInput) {
  return `
    <g fill="#${statsTextColor}">
      <circle cx="${onlineMembersX}" cy="${onlineMembersY}" r="4" fill="#43A25A"/>
      <text x="${onlineMembersX + 7}" y="${onlineMembersY + 5}" font-size="14" letter-spacing="-0.5">${onlineMembersCountText}</text>

      <circle cx="${membersX - 7}" cy="${membersY}" r="4" fill="#BCC0C0" />
      <text x="${membersX}" y="${membersY + 5}" font-size="14" letter-spacing="-0.5">${membersCountText}</text>
    </g>
  `
}

interface RenderButtonInput {
  buttonWidth: number
  buttonColor: string
  buttonBorderRadius: number
  buttonTextColor: string
  slicedButtonText: string

  buttonX: number
  buttonY: number
  textX: number
}

function renderButton({
  buttonWidth,
  buttonColor,
  buttonBorderRadius,
  buttonTextColor,
  slicedButtonText,

  buttonX,
  buttonY,
  textX,
}: RenderButtonInput) {
  return `
    <g>
      <rect width="${buttonWidth}" height="30" x="${buttonX}" y="${buttonY}" rx="${buttonBorderRadius}" ry="${buttonBorderRadius}" fill="#${buttonColor}" />
      <text width="${buttonWidth}" height="30" x="${textX}" y="${buttonY + 15}" text-anchor="middle" dominant-baseline="middle" font-weight="600" font-size="14" letter-spacing="-0.5" word-spacing="1.2" fill="#${buttonTextColor}">${slicedButtonText}</text>
    </g>
  `
}

export interface PreparedCardData {
  slicedGuildName: string
  slicedButtonText: string
  onlineMembersCountText: string
  membersCountText: string
  proportionalBorderRadius: number
}

export function prepareCardData({
  guildName,
  buttonText,
  maxTextLen,
  textEllipses,
  maxButtonTextLen,
  buttonTextEllipses,
  iconBorderRadius,
  onlineMembersCount,
  membersCount,
}: {
  guildName: string
  buttonText: string
  maxTextLen: number
  textEllipses: string
  maxButtonTextLen: number
  buttonTextEllipses: string
  iconBorderRadius: number
  onlineMembersCount: number
  membersCount: number
}): PreparedCardData {
  const sanitizedButtonText = sanitizeString(buttonText)
  const sanitizedTextEllipses = sanitizeString(textEllipses)
  const sanitizedButtonTextEllipses = sanitizeString(buttonTextEllipses)

  const slicedGuildName =
    guildName.length > maxTextLen
      ? `${guildName.slice(0, maxTextLen)}${sanitizedTextEllipses}`
      : guildName

  const slicedButtonText =
    sanitizedButtonText.length > maxButtonTextLen
      ? `${sanitizedButtonText.slice(0, maxButtonTextLen)}${sanitizedButtonTextEllipses}`
      : sanitizedButtonText

  const formattedOnlineMembersCount = numberFormatter.format(onlineMembersCount)
  const formattedMembersCount = numberFormatter.format(membersCount)

  return {
    slicedGuildName,
    slicedButtonText,
    onlineMembersCountText: `${formattedOnlineMembersCount} online`,
    membersCountText: `${formattedMembersCount} members`,
    proportionalBorderRadius: iconBorderRadius * 1.08,
  }
}

interface MakeCompactCardInput {
  icon: string | null
  guildName: string
  onlineMembersCount: number
  membersCount: number

  textColor: string | undefined
  maxTextLen: number | undefined
  textEllipses: string | undefined
  statsTextColor: string | undefined
  backgroundColor: string | undefined
  iconBorderColor: string | undefined
  iconBorderRadius: number | undefined
  borderRadius: number | undefined

  buttonColor: string | undefined
  buttonText: string | undefined
  maxButtonTextLen: number | undefined
  buttonTextEllipses: string | undefined
  buttonTextColor: string | undefined
  buttonBorderRadius: number | undefined
}

export async function makeCompactCard({
  icon,
  guildName,
  onlineMembersCount,
  membersCount,

  textColor = 'FFFFFF',
  maxTextLen = 25,
  textEllipses = '...',
  statsTextColor = 'BCC0C0',
  backgroundColor = '141414',
  iconBorderColor,
  iconBorderRadius = 10,
  borderRadius = 4,

  buttonColor = '00863A',
  buttonText = 'Join',
  maxButtonTextLen = 50,
  buttonTextEllipses = '...',
  buttonTextColor = 'FFFFFF',
  buttonBorderRadius = 6,
}: MakeCompactCardInput) {
  const {
    slicedGuildName,
    slicedButtonText,
    onlineMembersCountText,
    membersCountText,
    proportionalBorderRadius,
  } = prepareCardData({
    guildName,
    buttonText,
    maxTextLen,
    textEllipses,
    maxButtonTextLen,
    buttonTextEllipses,
    iconBorderRadius,
    onlineMembersCount,
    membersCount,
  })

  const onlineMembersWidth = onlineMembersCountText.length * CHAR_WIDTH
  const totalMembersStartX = DEFAULT_PADDING + onlineMembersWidth + 92

  const card = `
    <svg width="388" height="121" fill="#${backgroundColor}" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}

      <defs>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="17" y="17" rx="${iconBorderRadius}" ry="${iconBorderRadius}" />
        </clipPath>
      </defs>

      <rect width="100%" height="100%" rx="${borderRadius}" ry="${borderRadius}" />
      <rect width="54" height="54" x="15" y="15" rx="${proportionalBorderRadius}" ry="${proportionalBorderRadius}" fill="#${iconBorderColor || backgroundColor}" />
      <image width="50" height="50" x="17" y="17" clip-path="url(#iconClip)" href="${icon}" />

      <text x="77" y="40" font-weight="bold" font-size="20" fill="#${textColor}" letter-spacing="-0.5">${slicedGuildName}</text>

      ${renderStats({
        statsTextColor,
        onlineMembersX: 82,
        onlineMembersY: 55,
        membersX: totalMembersStartX,
        membersY: 54,
        onlineMembersCountText,
        membersCountText,
      })}

      ${renderButton({
        buttonWidth: 358,
        buttonColor,
        buttonBorderRadius,
        buttonTextColor,
        slicedButtonText,
        buttonX: 15,
        buttonY: 80,
        textX: 195,
      })}
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
  maxTextLen = 25,
  textEllipses = '...',
  statsTextColor = 'BCC0C0',
  backgroundColor = '141414',
  iconBorderColor,
  iconBorderRadius = 10,
  borderRadius = 4,

  buttonColor = '00863A',
  buttonText = 'Join',
  maxButtonTextLen = 40,
  buttonTextEllipses = '...',
  buttonTextColor = 'FFFFFF',
  buttonBorderRadius = 6,
}: MakeDefaultCardInput) {
  const {
    slicedGuildName,
    slicedButtonText,
    onlineMembersCountText,
    membersCountText,
    proportionalBorderRadius,
  } = prepareCardData({
    guildName,
    buttonText,
    maxTextLen,
    textEllipses,
    maxButtonTextLen,
    buttonTextEllipses,
    iconBorderRadius,
    onlineMembersCount,
    membersCount,
  })

  const totalOnlineMembersWidth = onlineMembersCountText.length * CHAR_WIDTH
  const totalMembersStartX = DEFAULT_PADDING + totalOnlineMembersWidth + 30

  const card = `
    <svg width="342" height="194" fill="#${backgroundColor}" xmlns="http://www.w3.org/2000/svg">
      ${fontImport}

      <defs>
        <clipPath id="bannerClip">
          <rect width="100%" height="60" x="0" y="0" rx="${borderRadius}" ry="${borderRadius}" />
          <rect width="100%" height="30" x="0" y="30" />
        </clipPath>
        <clipPath id="iconClip">
          <rect width="50" height="50" x="18" y="35" rx="${iconBorderRadius}" ry="${iconBorderRadius}" />
        </clipPath>
      </defs>

      <rect width="100%" height="100%" rx="${borderRadius}" ry="${borderRadius}" />
      <image width="100%" height="60" x="0" y="0" clip-path="url(#bannerClip)" preserveAspectRatio="xMidYMid slice" href="${banner}" />

      <rect width="54" height="54" x="16" y="33" rx="${proportionalBorderRadius}" ry="${proportionalBorderRadius}" fill="#${iconBorderColor || backgroundColor}" />
      <image width="50" height="50" x="18" y="35" clip-path="url(#iconClip)" href="${icon}" />

      <text x="15" y="111" font-weight="bold" font-size="20" fill="#${textColor}" letter-spacing="-0.5">${slicedGuildName}</text>

      ${renderStats({
        statsTextColor,
        onlineMembersX: 20,
        onlineMembersY: 126,
        membersX: totalMembersStartX,
        membersY: 126,
        onlineMembersCountText,
        membersCountText,
      })}

      ${renderButton({
        buttonWidth: 312,
        buttonColor,
        buttonBorderRadius,
        buttonTextColor,
        slicedButtonText,
        buttonX: 15,
        buttonY: 150,
        textX: 171,
      })}
    </svg>
  `.trim()

  return {
    card,
  }
}
