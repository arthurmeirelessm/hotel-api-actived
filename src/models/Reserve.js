import { Schema, model } from "mongoose";



const ReserveSchema = new Schema({
     date: String,
     user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
     },
     house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
     },
})

//Exporta e permite o acesso desse model para outras classes/arquivos
export default model('Reserve', ReserveSchema)