import app from './config/express'
import config from './config/env'
import mongoose from 'mongoose'

mongoose.connect(config.db)
mongoose.connection.on('connected', () => console.log(`Connected to: ${config.db}`))
mongoose.connection.on('error', () => console.error(`Unable to connect to: ${config.db}`))

/* Clean database */
/* mongoose.connection.dropDatabase(() => console.log(`DB cleaned`)) */

if (config.env === 'development') mongoose.set('debug', true)

app.listen(config.port, () => {
    console.log(`API Server started and listening on port ${config.port} ${config.env}`)
})

export default app
