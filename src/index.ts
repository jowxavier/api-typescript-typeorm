import 'module-alias/register'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import '@/database/data-source'
import routes from './routes'
import cors from 'cors'

const PORT = process.env.PORT || 8090

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(routes)

app.listen(PORT, () => {
    console.log(`server running in port ${PORT}`)
})