import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '@/utils/apiResponse'
import { ZodObject, ZodError } from 'zod'

const validateRequest = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedBody = await schema.parseAsync(req.body)
    req.body = parsedBody
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map(({ path, message }) => `${path.join('.')}: ${message}`)

      return ApiResponse.error('Validation Failed', StatusCodes.BAD_REQUEST, formattedErrors).send(res)
    }

    return ApiResponse.error('Internal Server Error').send(res)
  }
}

export default validateRequest
