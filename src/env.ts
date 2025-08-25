import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  TOKEN: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.error) {
  console.error(
    '❌ Invalid environment variables:',
    z.prettifyError(_env.error)
  )
  throw new Error('❌ Invalid environment variables')
}

export const env = _env.data
