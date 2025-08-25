import { Client } from 'discord.js'
import { env } from './env.ts'

export const client = new Client({
  intents: ['Guilds', 'GuildPresences'],
})

client.login(env.TOKEN)
