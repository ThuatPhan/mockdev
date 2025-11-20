import { User } from 'generated/prisma/client'

/// <reference types="@clerk/express/env" />

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}
