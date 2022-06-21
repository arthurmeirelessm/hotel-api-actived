import Reserve from "../models/Reserve";



class ReserveController {
    async store(req, res) {
        return res.json({ ok: true })
    }

}



export default new ReserveController()