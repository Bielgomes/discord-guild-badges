import type { FastifyInstance } from 'fastify'
import { createCardRoute } from './create-card.ts'
import { createCompactCardRoute } from './create-compact-card.ts'

export async function cardsRoutes(app: FastifyInstance) {
  app.get('/:guildId', createCardRoute)
  app.get('/compact/:guildId', createCompactCardRoute)
}
