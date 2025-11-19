import { configDotenv } from 'dotenv'

configDotenv({ quiet: true })

const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
}

export default ENV
