import express from 'express'
import routes from './routes'
import mongoose from 'mongoose'


class App{

    constructor() {
        this.server = express()

        mongoose.connect('mongodb+srv://arthurmeirelessm:msesjdfdn10@devhouse.xw1yxsr.mongodb.net/hotelapi?retryWrites=true&w=majority', {
            useNe 
        })
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
    }

    routes() {
         this.server.use(routes)
     }
}


export default new App().server