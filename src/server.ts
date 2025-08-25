import { app } from './app.ts'
import { env } from './env.ts'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })
