import { Router } from 'express'
import HouseController from './controllers/HouseController'
import sessionController from './controllers/SessionController'
import FromController from './controllers/SessionController'
import multer from 'multer' //Extensão do express que permite a munipulação de arquivos, usado para passagens de arquivos pelos endpionts
import uploadConfig from './config/upload'


const routes = new Router()


const upload = multer(uploadConfig)

//Arquivo destinado as rotas
//Dentro de cada route teremos uma chhamada de um metodo (store, index, update) especifico de cada controller relacioando


//Sessions
routes.post('/sessions', sessionController.store)

routes.get('/sessions', sessionController.index)


//Houses
routes.post('/houses', upload.single('thumbnail'), HouseController.store)

routes.get('/houses', HouseController.index)

export default routes

