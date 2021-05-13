const mongoose = require('mongoose');

//Schema of a product
const requestSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user:{ type:mongoose.Schema.Types.ObjectId, ref:'User',required:true},
    sns: {type: Boolean, required:true},
    presente: {type: Boolean, required:true},
    resultadoClinico:{type: String, default : "Espera"},
    relatorioClinico:{type: String}
});

//Exports modules as an object
module.exports = mongoose.model('Request', requestSchema)