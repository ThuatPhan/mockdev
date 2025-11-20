import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '@/utils/apiResponse'
import AppError from '@/exceptions/appError'
import logger from '@/config/logger'

const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err)

  if (err instanceof AppError) {
    return res.status(err.statusCode).json(ApiResponse.error(err.message, err.statusCode))
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ApiResponse.error('Internal Server Error'))
}

export default exceptionHandler
