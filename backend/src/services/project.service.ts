import { CreateProjectInput, UpdateProjectInput } from '@/schemas/project.schema'
import { ProjectWhereInput } from 'generated/prisma/models/Project'
import PagedResponse from '@/utils/pagedResponse'
import { StatusCodes } from 'http-status-codes'
import AppError from '@/exceptions/appError'
import prisma from '@/config/db'

const ProjectService = {
  create: async (userId: string, data: CreateProjectInput) => {
    const { name, prefix: apiPrefix } = data

    return await prisma.project.create({
      data: { name, prefix: apiPrefix, ownerId: userId }
    })
  },

  getOne: async (id: string, userId: string) => {
    const project = await prisma.project.findUnique({ where: { id } })

    if (!project) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Project not found')
    }

    if (project.ownerId !== userId) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden')
    }

    return project
  },

  getAll: async (userId: string, page: number, size: number) => {
    const skip = (page - 1) * size

    const whereClause: ProjectWhereInput = {
      ownerId: userId
    }

    const [total, data] = await prisma.$transaction([
      prisma.project.count({ where: whereClause }),
      prisma.project.findMany({
        where: whereClause,
        skip,
        take: size,
        orderBy: { updatedAt: 'desc' }
      })
    ])

    return PagedResponse.of(data, page, size, total)
  },

  update: async (id: string, userId: string, data: UpdateProjectInput) => {
    const existing = await prisma.project.findUnique({ where: { id } })

    if (!existing) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Project not found')
    }

    if (existing.ownerId !== userId) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden')
    }

    return await prisma.project.update({
      where: { id },
      data
    })
  },

  delete: async (id: string, userId: string) => {
    const existing = await prisma.project.findUnique({ where: { id } })

    if (!existing) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Project not found')
    }

    if (existing.ownerId !== userId) {
      throw new AppError(StatusCodes.FORBIDDEN, 'Forbidden')
    }

    await prisma.project.delete({ where: { id } })
    return true
  }
}

export default ProjectService
