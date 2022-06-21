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

        if (String(getHouse.user) != String(getUser._id)) {
            return res.status(404).json({ Error: 'House not found' })
        }

        if (String(getHouse.user) == String(getUser._id)) {
            return res.status(404).json({ Error: 'User is same that was create' })
        }

        if (getHouse.status == false) {
           return res.status(404).json({ Error: 'House not available' })
        }



        //Populate: Serve para mesclar os responses ue vem dois dois models citados abaixo (user, house)
        await createReserve.populate('house').populate('user').execPopulate()

        return res.json(createReserve)
    }
}



export default new ReserveController()