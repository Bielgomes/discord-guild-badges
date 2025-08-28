import { DiscordAPIError } from 'discord.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { client } from '@/client.ts'
import { createCard } from '@/functions/create-card.ts'
import { FetchImageError } from '@/functions/errors/fetch-image-error.ts'
import { getOnlineMembersCount } from '@/utils/functions.ts'

const colorSchema = z
  .string()
  .regex(/^[0-9a-f]{6}$/i)
  .optional()

export async function createCardRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCardParamsSchema = z.object({
    guildId: z.string(),
  })

  const createCardQuerySchema = z.object({
    mode: z.enum(['default', 'compact']).default('default'),

    textColor: colorSchema,
    statsTextColor: colorSchema,
    backgroundColor: colorSchema,
    iconBorderColor: colorSchema,
    iconBorderRadius: z.coerce.number().max(25).optional(),
    borderRadius: z.coerce.number().max(30).optional(),

    buttonColor: colorSchema,
    buttonText: z.string().optional(),
    buttonTextColor: colorSchema,
    buttonBorderRadius: z.coerce.number().max(15).optional(),
  })

  const { guildId } = createCardParamsSchema.parse(request.params)
  const {
    mode,

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
  } = createCardQuerySchema.parse(request.query)

  try {
    const guild = await client.guilds.fetch(guildId)
    const guildOnlineMemberCount = getOnlineMembersCount(guild)

    const { card } = await createCard({
      mode,

      guildName: guild.name,
      guildIconUrl: guild.iconURL(),
      guildBannerUrl: guild.bannerURL(),
      guildMemberCount: guild.memberCount,
      guildOnlineMemberCount,

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

    return reply.status(200).header('content-type', 'image/svg+xml').send(card)
  } catch (err) {
    if (err instanceof FetchImageError) {
      return reply
        .status(400)
        .send({ message: 'Failed to fetch or process guild image' })
    }

    if (err instanceof DiscordAPIError && err.code === 10004) {
      return reply.status(400).send({ message: 'Guild not found' })
    }

    throw err
  }
}
