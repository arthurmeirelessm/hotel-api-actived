import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'
import path from 'path'


class App{

    constructor() {
        this.server = express()

        mongoose.connect('mongodb+srv://arthurmeirelessm:msesjdfdn10@devhouse.xw1yxsr.mongodb.net/hotelapi?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use('./files', express.static(path.resolve(__dirname, '..', 'uploads')))
        this.server.use(express.json())
    }
    
    //Chama as rotas
    routes() {
         this.server.use(routes)
     }
}


export default new App().server