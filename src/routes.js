import { Router } from 'express'
import HouseController from './controllers/HouseController'
import sessionController from './controllers/SessionController'
import FromController from './controllers/SessionController'
import multer from 'multer' //Extensão do express que permite a munipulação de arquivos, usado para passagens de arquivos pelos endpionts
import uploadConfig from './config/upload'
import dashboardController from './controllers/DashboardController'


const routes = new Router()


const upload = multer(uploadConfig)

//Arquivo destinado as rotas
//Dentro de cada route teremos uma chhamada de um metodo (store, index, update) especifico de cada controller relacioando


//Sessions
routes.post('/sessions', sessionController.store)

routes.get('/sessions', sessionController.index)

routes.delete('/sessions/:user_id', sessionController.destroy)


//Houses
routes.post('/houses', upload.single('thumbnail'), HouseController.store)

routes.get('/houses', HouseController.index)

routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update)

routes.delete('/houses/:house_id', HouseController.destroy)


//Dashboard
routes.get('/dashboards'. dashboardController.)


export default routes

