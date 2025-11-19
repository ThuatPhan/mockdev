import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ProjectInput } from '@/schemas/project-schema'
import ApiResponse from '@/utils/api-response'
import AppError from '@/errors/app.error'

export const createProject = async (req: Request, res: Response) => {
  const data = req.body as ProjectInput

  return res.status(StatusCodes.CREATED).json(ApiResponse.success(data))
}
