//Methods
//Index: Sessions list (GET)
//Store: Create new session(POST)
//Show: When we want to only one session of list(GET)
//Update: When we want to change one session(PUT)
//Destroy: When we want to delete one session(DELETE)

import User from '../models/User'

class SessionController {
    //To create session in MongoDb
    async store(req, res) {
        const { email } = req.body
        let user = await User.findOne({ email })
        if (user == null) {
            user = await User.create({ email })
        }
        return res.json(user)
    }

    //All registers sessions 
    async index(req, res) {
        //O metodo then é obrigado a receber um parametro "response" que esta relacionado a ao que tu quis buscart com o find
        const findSessions = await User.find().then((response) => {
            return res.json(response)
        })
        return findSessions
    }
}


export default new SessionController()