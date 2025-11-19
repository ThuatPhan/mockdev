import winston from 'winston'
import ENV from '@/config/env'

const { combine, timestamp, printf, errors, colorize } = winston.format

const env = ENV.NODE_ENV || 'development'

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`
})

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), logFormat)
    })
  ]
})

if (env === 'production') {
  logger.add(
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    })
  )

  logger.add(
    new winston.transports.File({
      filename: 'logs/combined.log'
    })
  )
}

export default logger
