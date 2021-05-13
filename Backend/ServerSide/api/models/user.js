const mongoose = require('mongoose');

//Schema of a product
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nome: {type: String, required:true },
    morada: {type: String, required:true },
    codigoPostal: {type: Number, required:true },
    nTelemovel: {type: Number, required:true },
    idade: {type: Number, required:true },
    genero: {type: String, required:true },
    historico: {type: Boolean, required:true},
    estadoTeste: {type: String },
    teste: [{resultado: {type:Boolean}, data: {type:String}}],
    email: {
        type:String, 
        required:true, 
        unique: true, 
        match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    },
    password: {type:String, required:true}
});

//Exports modules as an object
module.exports = mongoose.model('User',userSchema)