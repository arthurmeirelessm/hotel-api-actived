//Methods
//Index: Sessions list (GET)
//Store: Create new session(POST)
//Show: When we want to only one session of list(GET)
//Update: When we want to change one session(PUT)
//Destroy: When we want to delete one session(DELETE)

import User from '../models/User'

class SessionController {
    async store(req, res) {
        const { email } = req.body
        let user = await User.findOne({ email })
        if (user == null) {
            user = await User.create({ email })
        }
        return res.json(user)
    }

    
    async index(req, res) {
        const findSessions = await User.find({}).then((artigo) => {
            return res.json(artigo)
        })
        return findSessions
    }
}


export default new SessionController()