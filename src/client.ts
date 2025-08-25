import { Client } from 'discord.js'
import { env } from './env.ts'
import { app } from './app.ts'

export const client = new Client({
  intents: ['Guilds', 'GuildPresences'],
})

client.login(env.TOKEN).then(() => {
  app.log.info('Discord Bot is running!')
})
