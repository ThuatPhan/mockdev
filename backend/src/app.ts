import cors from 'cors'
import express from 'express'
import ENV from '@/config/env'
import { exit } from 'node:process'
import routes from '@/routes/index'
import logger from '@/config/logger'
import { serve } from 'inngest/express'
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from '@/config/inngest'
import exceptionHandler from '@/middlewares/exceptionHandler.middleware'

const app = express()

app.use(cors({ origin: ENV.ALLOWED_ORIGIN, credentials: true }))
app.use(express.json())
app.use(clerkMiddleware({ publishableKey: ENV.CLERK_PUBLISHABLE_KEY, secretKey: ENV.CLERK_SECRET_KEY }))
app.use('/api', routes)
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use(exceptionHandler)

app.listen(ENV.PORT, (error) => {
  if (error) {
    logger.error('Error when start server: ', error)
    exit(1)
  }
  logger.info(`Server is running on port ${ENV.PORT}`)
})
