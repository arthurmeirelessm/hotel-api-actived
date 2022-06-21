//Methods
//Index: Sessions list (GET)
//Store: Create new session(POST)
//Show: When we want to only one session of list(GET)
//Update: When we want to change one session(PUT)
//Destroy: When we want to delete one session(DELETE)


import House from '../models/House'
import User from '../models/User'

class HouseController {

    //All registers houses 
    async index(req, res) {
        const { status } = req.query
        const getHouses = await House.find({ status })
        return res.json(getHouses)
    }


    //To create house in MongoDb
    async store(req, res) {
        const { filename } = req.file
        const { description, price, location, status } = req.body
        const { user_id } = req.headers
        
        const house = await House.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })

        console.log(filename)
        return res.json(house)
    }


    //Update house
    async update(req, res) {
        const { filename } = req.file
        const { house_id } = req.params
        const { description, price, location, status } = req.body
        const { user_id } = req.headers

        const user = await User.findById(user_id)
        const house = await House.findById(house_id)

        if (String(user._id) != String(house.user)) {
            return res.status(401).json({ Error: 'Not authorized' })
        }

        const housesUpdate = await House.updateOne({ _id: house_id }, {
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        })

        return res.send()
    }

    //Delete house
    async destroy(req, res) {
        const { house_id } = req.params
        const { user_id } = req.headers

        const getHouse = await House.findById(house_id)
        const getUser = await User.findById(user_id)

        if (String(getHouse.user) != String(getUser._id)) {
            return res.status(404).json({ Error: 'Not authorized' })
        }
        let DeleteHouse
        DeleteHouse = await House.findByIdAndDelete({ _id: house_id })
        return res.json({ Message: 'Delete with success' })
    }
}

export default new HouseController()