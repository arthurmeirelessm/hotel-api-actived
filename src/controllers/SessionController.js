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
        return await User.find().then((response) => {
            return res.json(response)
        })

    }
    
    //Get one session/user 
    async show(req, res) {
        const { user_id } = req.params
        const getUserById = await User.find().then((response) => {
            const filter = response.filter(item => item._id == user_id)
            return filter
        })
        return res.json(getUserById)
    }

    //Delete user
    async destroy(req, res) {
        const { user_id } = req.params
        const DeleteUser = await User.findByIdAndDelete({ _id: user_id })
        return res.json({ Message: 'Delete with success' })
    }
}


export default new SessionController()