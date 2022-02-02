// importing libraries
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import todo from './routes/todo'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express()

// prebuild middlewares
app.use(cors()) // Enable All CORS Requests
app.use(helmet()) // Securing Express apps by setting various HTTP headers
app.use(morgan('tiny')) // HTTP request logger
app.use(express.json()) // It parses incoming requests with JSON payloads and is based on body-parser
app.use(limiter) // Basic rate-limiting middleware

// Api route
app.use('/api/v1', todo)

// Port number (reading port from .env file)
const port = process.env.PORT || 3000
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`listening on port ${port}`))
