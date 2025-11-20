import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '@/utils/apiResponse'
import { getAuth } from '@clerk/express'
import prisma from '@/config/db'

const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
  const { isAuthenticated, userId } = getAuth(req)

  if (!isAuthenticated) {
    return ApiResponse.error('Unauthenticated', StatusCodes.UNAUTHORIZED).send(res)
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })

  if (!user) {
    return ApiResponse.error('Unauthenticated', StatusCodes.UNAUTHORIZED).send(res)
  }

  req.user = user

  next()
}

export default protectRoute
