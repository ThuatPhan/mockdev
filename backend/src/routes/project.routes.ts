import express from 'express'
import ProjectController from '@/controllers/project.controller'
import validateRequest from '@/middlewares/validateRequest.middleware'
import { createProjectSchema, updateProjectSchema } from '@/schemas/project.schema'

const router = express.Router()

router.get('/', ProjectController.getAll)
router.get('/:id', ProjectController.getOne)
router.post('/', validateRequest(createProjectSchema), ProjectController.create)
router.put('/:id', validateRequest(updateProjectSchema), ProjectController.update)
router.delete('/:id', ProjectController.delete)

export default router
