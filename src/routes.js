import { Router } from 'express'
import sessionController from './controllers/SessionController'
import FromController from './controllers/SessionController'

const routes = new Router()

routes.post('/sessions', sessionController.store)

routes.get('/sessions', sessionController.index)

export default routes

