//Methods
//Index: Sessions list (GET)
//Store: Create new session(POST)
//Show: When we want to only one session of list(GET)
//Update: When we want to change one session(PUT)
//Destroy: When we want to delete one session(DELETE)
import House from '../models/House'

class HouseController {

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

    //All registers houses 
    async index(req, res) {
        const { status } = req.query
        const getHouses = await House.find({ status })
        return res.json(getHouses)
    }
}

export default new HouseController()