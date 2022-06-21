import Reserve from "../models/Reserve";



class ReserveController {
    async store(req, res) {
        const { user_id } = req.headers
        const { house_id } = req.params
        const { date } = req.body
        
        const CreateReserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        })

        return res.json(CreateReserve)

    }

}



export default new ReserveController()