import { app } from './app.ts'
import { env } from './env.ts'

app
  .listen({
    host: env.HOST,
    port: env.PORT,
  })
  .then(() => {
    app.log.info('🚀 HTTP server is running!')
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })
