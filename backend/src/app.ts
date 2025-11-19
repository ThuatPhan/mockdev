import { clerkMiddleware } from '@clerk/express'
import { serve } from 'inngest/express'
import { exit } from 'node:process'
import express from 'express'
import cors from 'cors'
import ENV from '@/config/env'
import logger from '@/config/logger'
import routes from '@/routes/index'
import { inngest, functions } from '@/config/inngest'
import exceptionHandler from '@/middlewares/exception.handler.middleware'

const app = express()

app.use(cors())
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
