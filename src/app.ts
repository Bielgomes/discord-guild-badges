import { fastify } from 'fastify'
import z, { ZodError } from 'zod'
import { cardsRoutes } from './routes/routes.ts'

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

app.register(cardsRoutes, {
  prefix: '/api',
})

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
