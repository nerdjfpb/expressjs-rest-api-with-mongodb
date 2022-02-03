/* eslint-disable no-console */
// importing libraries
import 'dotenv/config'
import Express from 'express'
import Mongoose from 'mongoose'
import Cors from 'cors'
import Morgan from 'morgan'
import Helmet from 'helmet'
import RateLimit from 'express-rate-limit'
import Todo from './routes/todo'

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = Express()

// connect to db
Mongoose.connect('mongodb://localhost/demotodo')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log(`Could not connect to MongoDB...${err}`))

// prebuild middlewares
app.use(Cors()) // Enable All CORS Requests
app.use(Helmet()) // Securing Express apps by setting various HTTP headers
app.use(Morgan('tiny')) // HTTP request logger
app.use(Express.json()) // It parses incoming requests with JSON payloads and is based on body-parser
app.use(limiter) // Basic rate-limiting middleware

// Api route
app.use('/api/v1', Todo)

// Port number (reading port from .env file)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))
