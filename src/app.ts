import { type FastifyReply, type FastifyRequest, fastify } from 'fastify'
import z, { ZodError } from 'zod'
import { client } from './client.ts'
import { makeCompactCard, makeDefaultCard } from './utils/cards.ts'
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
    const defaultCardParamsSchema = z.object({
      guildId: z.string(),
    })

    const defaultCardQuerySchema = z.object({
      buttonMessage: z.string().optional(),
    })

    const { guildId } = defaultCardParamsSchema.parse(request.params)
    const { buttonMessage } = defaultCardQuerySchema.parse(request.query)

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

      const { card } = await makeDefaultCard({
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
        .send(card)
    } catch {
      await reply.status(400).send()
    }
  }
)

app.get(
  '/api/compact/:guildId',
  async (request: FastifyRequest, reply: FastifyReply) => {
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
      const { guildOnlineMemberCount } = getOnlineMembersCount(guild)

      const guildIconUrl =
        guild.iconURL() || 'https://cdn3.emoji.gg/emojis/4789-discord-icon.png'
      const guildIconBase64 = await fetchImageAndTransformToBase64(guildIconUrl)

      const { card } = await makeCompactCard({
        iconUrl: guildIconBase64,
        guildName: guild.name,
        totalOnlineMembersCount: guildOnlineMemberCount,
        totalMembersCount: guild.memberCount,
        buttonMessage,
      })

      return reply
        .status(200)
        .header('content-type', 'image/svg+xml')
        .send(card)
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
