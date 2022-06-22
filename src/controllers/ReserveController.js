import Reserve from "../models/Reserve";
import House from "../models/House"
import User from "../models/User"
import * as Yup from 'yup'



class ReserveController {

    //Create reserve with relatioship user and house models
    async store(req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body


        const getHouse = await House.findById(house_id)
        const getUser = await User.findById(user_id)
        const getReserve = await Reserve.find().then((response) => {
            const filterReserve = response.filter(item => item.date == date && item.house == house_id)
            return filterReserve.length
        })

        if (getReserve > 0) {
            return res.status(400).json({ Error: 'We already have a reservation on this same date' })
        }
        if (!getHouse) {
            return res.status(400).json({ Error: 'House not found' })
        }
        if (getHouse.status != true) {
            return res.status(400).json({ Error: 'House not available' })
        }
        if (String(getHouse.user) == String(getUser._id)) {
            return res.status(401).json({ Error: 'User is same that was create' })
        }

        const createReserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        })

        //Populate: Serve para mesclar os responses ue vem dois dois models citados abaixo (user, house)
        await createReserve.populate('house').populate('user').execPopulate()

        return res.json(createReserve)
    }

    //Get all reserves
    async index(req, res) {
        return await Reserve.find().then((response) => {
            return res.json(response)
        })
    }


    //Delete/cancel reserves
    async destroy(req, res) {
        const { reserve_id } = req.params
        const { user_id } = req.headers

        const getUser = await User.findById(user_id)
        const getReserve = await Reserve.findById(reserve_id)

        if (String(getUser._id) != String(getReserve.user)) {
            return res.status(400).json({ Error: 'No one can cancel the reservation other than the one who booked it' })
        }

        const deleteReserve = await Reserve.findByIdAndDelete(reserve_id)

        return res.json(deleteReserve)
    }



    //Busca reservas pelo id do usuario 
    async show(req, res) {
        const { user_id } = req.params
        const getUserReserves = await Reserve.find().then((response) => {
            const filter = response.filter(item => item.user == user_id)
            return filter
        })

        return res.json(getUserReserves)
    }
}



export default new ReserveController()