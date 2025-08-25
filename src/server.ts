import { app } from './app.ts'

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => {
    app.log.info('🚀 HTTP server is running!')
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })
