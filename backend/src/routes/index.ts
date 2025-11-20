import { Router } from 'express'
import projectRoutes from '@/routes/project.routes'
import protectRoute from '@/middlewares/protectRoute.middleware'

const router = Router()

router.use('/projects', protectRoute, projectRoutes)

export default router
