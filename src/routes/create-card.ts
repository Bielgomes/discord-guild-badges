import { DiscordAPIError } from 'discord.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { client } from '@/client.ts'
import { createCard } from '@/functions/create-card.ts'
import { FetchImageError } from '@/functions/errors/fetch-image-error.ts'
import { getOnlineMembersCount } from '@/utils/functions.ts'

export async function createCardRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const createCardParamsSchema = z.object({
    guildId: z.string(),
    buttonMessage: z.string().optional(),
  })

  const createCardQuerySchema = z.object({
    mode: z.enum(['default', 'compact']).default('default'),
    buttonMessage: z.string().optional(),
  })

  const { guildId } = createCardParamsSchema.parse(request.params)
  const { mode, buttonMessage } = createCardQuerySchema.parse(request.query)

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
      buttonMessage,
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
