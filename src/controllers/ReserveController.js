import Reserve from "../models/Reserve";
import House from "../models/House"
import User from "../models/User"


class ReserveController {
    async store(req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body


        console.log(house_id)
        const createReserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        })

        const getHouse = await House.findById(house_id)
        const getUser = await User.findById(user_id)

        if (!getHouse) {
            return res.status(400).json({ Error: 'House not found' })
        }
        if (getHouse.status != true) {
            return res.status(400).json({ Error: 'House not available' })
        }
        if (String(getHouse.user) == String(getUser._id)) {
            return res.status(401).json({ Error: 'User is same that was create' })
        }
        //Populate: Serve para mesclar os responses ue vem dois dois models citados abaixo (user, house)
        await createReserve.populate('house').populate('user').execPopulate()

        return res.json(createReserve)
    }

    async show(req, res) {
        const { user_id } = req.params
        const getUserReserves = await Reserve.find().then((response) => {
            return response
        })
        const isSame = getUserReserves.filter(item => item.user == user_id)
        return res.json(isSame)
    }
}



export default new ReserveController()