import { configDotenv } from 'dotenv'

configDotenv({ quiet: true })

const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY
}

export default ENV
