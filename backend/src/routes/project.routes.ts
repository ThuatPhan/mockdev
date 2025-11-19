import { createProject } from '@/controllers/project.controller'
import { validateRequest } from '@/middlewares/validateRequest.middleware'
import { projectSchema } from '@/schemas/project-schema'
import express from 'express'

const router = express.Router()
router.post('/', validateRequest(projectSchema), createProject)

export default router
