import { Router } from 'express'
import projectRoutes from '@/routes/project.routes'

const router = Router()

router.use('/projects', projectRoutes)

export default router
