import { type FastifyReply, type FastifyRequest, fastify } from 'fastify'
import z, { ZodError } from 'zod'
import { client } from './client.ts'
import { makeCompactBadge, makeDefaultBadge } from './utils/badges.ts'
import {
  fetchImageAndTransformToBase64,
  getOnlineMembersCount,
} from './utils/functions.ts'

export const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
        translateTime: 'HH:MM:ss Z',
      },
    },
  },
})

app.get(
  '/api/:guildId',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const defaultBadgeParamsSchema = z.object({
      guildId: z.string(),
    })

    const defaultBadgeQuerySchema = z.object({
      buttonMessage: z.string().optional(),
    })

    const { guildId } = defaultBadgeParamsSchema.parse(request.params)
    const { buttonMessage } = defaultBadgeQuerySchema.parse(request.query)

    try {
      const guild = await client.guilds.fetch(guildId)
      const { guildOnlineMemberCount } = getOnlineMembersCount(guild)

      const guildIconUrl =
        guild.iconURL() || 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
      const guildIconBase64 = await fetchImageAndTransformToBase64(guildIconUrl)

      const guildBannerUrl =
        guild.bannerURL() || 'https://i.imgur.com/WcIB4vh.jpeg'
      const guildBannerBase64 =
        await fetchImageAndTransformToBase64(guildBannerUrl)

      const { badge } = await makeDefaultBadge({
        iconUrl: guildIconBase64,
        bannerUrl: guildBannerBase64,
        guildName: guild.name,
        totalOnlineMembersCount: guildOnlineMemberCount,
        totalMembersCount: guild.memberCount,
        buttonMessage,
      })

      return reply
        .status(200)
        .header('content-type', 'image/svg+xml')
        .send(badge)
    } catch {
      await reply.status(400).send()
    }
  }
)

app.get(
  '/api/compact/:guildId',
  async (request: FastifyRequest, reply: FastifyReply) => {
    const compactBadgeParamsSchema = z.object({
      guildId: z.string(),
      buttonMessage: z.string().optional(),
    })

    const compactBadgeQuerySchema = z.object({
      buttonMessage: z.string().optional(),
    })

    const { guildId } = compactBadgeParamsSchema.parse(request.params)
    const { buttonMessage } = compactBadgeQuerySchema.parse(request.query)

    try {
      const guild = await client.guilds.fetch(guildId)
      const { guildOnlineMemberCount } = getOnlineMembersCount(guild)

      const guildIconUrl =
        guild.iconURL() || 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
      const guildIconBase64 = await fetchImageAndTransformToBase64(guildIconUrl)

      const { badge } = await makeCompactBadge({
        iconUrl: guildIconBase64,
        guildName: guild.name,
        totalOnlineMembersCount: guildOnlineMemberCount,
        totalMembersCount: guild.memberCount,
        buttonMessage,
      })

      return reply
        .status(200)
        .header('content-type', 'image/svg+xml')
        .send(badge)
    } catch {
      await reply.status(400).send()
    }
  }
)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: z.prettifyError(error),
    })
  }

  app.log.error({
    msg: error.message,
    stack: error.stack,
  })

  return reply.status(500).send()
})
