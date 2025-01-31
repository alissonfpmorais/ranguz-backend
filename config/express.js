import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from '../server/routes'

const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', routes)

app.use((err, req, res, next) => {
    res.status(err.status)
        .json({
            status: err.status,
            message: err.message
        })
})

export default app