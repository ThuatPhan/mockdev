import express from 'express'
import { exit } from 'node:process'
import ENV from '@/config/env'
import logger from '@/config/logger'

const app = express()

app.listen(ENV.PORT, (error) => {
  if (error) {
    logger.error('Error when start server: ', error)
    exit(1)
  }
  logger.info(`Server is running on port ${ENV.PORT}`)
})
