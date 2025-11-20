import { UpdateProjectInput } from '@/schemas/project.schema'
import ProjectService from '@/services/project.service'
import { StatusCodes } from 'http-status-codes'
import ApiResponse from '@/utils/apiResponse'
import { Request, Response } from 'express'

const ProjectController = {
  create: async (req: Request, res: Response) => {
    const userId = req.user.id
    const data = req.body
    const project = await ProjectService.create(userId, data)

    return ApiResponse.success(project).send(res, StatusCodes.CREATED)
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body as UpdateProjectInput
    const userId = req.user.id

    const project = await ProjectService.update(id, userId, data)
    return ApiResponse.success(project).send(res)
  },

  delete: async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.id

    await ProjectService.delete(id, userId)
    return ApiResponse.success(null).send(res)
  },

  getOne: async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = req.user.id

    const project = await ProjectService.getOne(id, userId)
    return ApiResponse.success(project).send(res)
  },

  getAll: async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1
    const size = Number(req.query.size) || 10
    const userId = req.user.id

    const result = await ProjectService.getAll(userId, page, size)
    return ApiResponse.success(result).send(res)
  }
}

export default ProjectController
