import { Schema, model } from "mongoose";

const HouseSchema = new Schema({
    thumbnail: String,
    description: String,
    price: Number,
    location: String,
    status: Boolean,
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
    //toJSON serve para avisar ao express e validar a o processo de atributo virtual logo abaixo, sendo setado como TRUE
    //Assim permitirá que ele apareça no response
}) 

//Virtual: Atributo que irá aparecer no response, porem não será criado no MongoDb
HouseSchema.virtual('thumbnail-url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`
})

//Exporta e permite o acesso desse model para outras classes/arquivos
export default model('House', HouseSchema)