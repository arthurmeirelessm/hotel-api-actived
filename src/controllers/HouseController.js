import House from '../models/House'

class HouseController {


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

    async index(req, res) {
        const  { status } = req.query
        const getHouses = await House.find( {status} )
        return res.json(getHouses)
    }
}

export default new HouseController()