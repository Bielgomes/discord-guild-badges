import { DiscordAPIError } from 'discord.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { client } from '@/client.ts'
import { createCompactCard } from '@/functions/create-compact-card.ts'
import { FetchImageError } from '@/functions/errors/fetch-image-error.ts'
import { getOnlineMembersCount } from '@/utils/functions.ts'

export async function createCompactCardRoute(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const compactCardParamsSchema = z.object({
    guildId: z.string(),
    buttonMessage: z.string().optional(),
  })

  const compactCardQuerySchema = z.object({
    buttonMessage: z.string().optional(),
  })

  const { guildId } = compactCardParamsSchema.parse(request.params)
  const { buttonMessage } = compactCardQuerySchema.parse(request.query)

  try {
    const guild = await client.guilds.fetch(guildId)
    const guildOnlineMemberCount = getOnlineMembersCount(guild)

    const { card } = await createCompactCard({
      guildName: guild.name,
      guildIconUrl: guild.iconURL(),
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
