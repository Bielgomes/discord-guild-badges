import { type FastifyReply, type FastifyRequest, fastify } from 'fastify'
import z from 'zod'
import { client } from './client.ts'
import { makeDefaultBadge } from './utils/badges.ts'

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

app.get('/:guildId', async (request: FastifyRequest, reply: FastifyReply) => {
  const paramsSchema = z.object({
    guildId: z.string(),
  })

  const { guildId } = paramsSchema.parse(request.params)

  try {
    const guild = await client.guilds.fetch(guildId)

    const { badge } = await makeDefaultBadge({
      iconUrl: guild.iconURL(),
      bannerUrl: guild.bannerURL(),
      guildName: guild.name,
      totalOnlineMembersCount: 999,
      totalMembersCount: 999,
    })

    return reply.status(200).header('content-type', 'image/svg+xml').send(badge)
  } catch {
    await reply.status(400).send()
  }
})
