import { Client } from 'discord.js'
import { app } from './app.ts'
import { env } from './env.ts'

export const client = new Client({
  intents: ['Guilds', 'GuildPresences'],
})

client.login(env.TOKEN).then(() => {
  app.log.info('Discord Bot is running!')
})
