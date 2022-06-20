import { Router } from 'express'
import HouseController from './controllers/HouseController'
import sessionController from './controllers/SessionController'
import FromController from './controllers/SessionController'
import multer from 'multer'
import uploadConfig from './config/upload'

const routes = new Router()

const upload = multer(uploadConfig)

routes.post('/sessions', sessionController.store)

routes.get('/sessions', sessionController.index)

routes.post('/houses', upload.single('thumbnail'), HouseController.store)

export default routes

