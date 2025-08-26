import type { FastifyInstance } from 'fastify'
import { createCardRoute } from './create-card.ts'

export async function cardsRoutes(app: FastifyInstance) {
  app.get('/:guildId', createCardRoute)
}
