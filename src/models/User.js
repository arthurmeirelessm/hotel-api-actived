import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    email: String
})


//Exporta e permite o acesso desse model para outras classes/arquivos
export default model('User', UserSchema)