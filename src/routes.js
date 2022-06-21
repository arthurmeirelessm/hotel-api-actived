import { Router } from 'express'
import HouseController from './controllers/HouseController'
import sessionController from './controllers/SessionController'
import FromController from './controllers/SessionController'
import multer from 'multer' //Extensão do express que permite a munipulação de arquivos, usado para passagens de arquivos pelos endpionts
import uploadConfig from './config/upload'
import ReserveController from './controllers/ReserveController'


const routes = new Router()


const upload = multer(uploadConfig)

//Arquivo destinado as rotas
//Dentro de cada route teremos uma chhamada de um metodo (store, index, update) especifico de cada controller relacioando


//Sessions
routes.post('/sessions', sessionController.store)

routes.get('/sessions', sessionController.index)

routes.get('/sessions/:user_id', sessionController.show)

routes.delete('/sessions/:user_id', sessionController.destroy)


//Houses
routes.post('/houses', upload.single('thumbnail'), HouseController.store)

routes.get('/houses', HouseController.index)

routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update)

routes.delete('/houses/:house_id', HouseController.destroy)


//reserves
routes.post('/houses/:house_id/reserves', ReserveController.store)

routes.get('/houses/:user_id/reserves', ReserveController.show)


export default routes

