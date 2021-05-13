const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Request = require('../models/request');

exports.users_get_all = (req, res, next) => {
    User.find()
    //Only fetch this fields
    .select('nome morada codigoPostal nTelemovel idade genero historico estadoTeste email teste')
    .exec().
    //Returns numbers os elements, data, and URL of user
    then(docs =>{
        const response = {
            count: docs.length,
            users:docs.map(doc =>{
                return{
                    user: doc,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/users/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
};

exports.users_signup = (req , res, next) => {
    User
    .find({email : req.body.email})
    .exec()
    .then(user =>{
        if (user.length >= 1) {
            return res.status(409).json({
                message : 'Mail existente'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    });
                } else{
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        nome: req.body.nome,
                        morada: req.body.morada,
                        codigoPostal: req.body.codigoPostal,
                        nTelemovel: req.body.nTelemovel,
                        idade: req.body.idade,
                        genero: req.body.genero,
                        historico: req.body.historico,
                        estadoTeste: req.body.estadoTeste,
                        teste:req.body.teste,
                        email:req.body.email,
                        password: hash,
                        role: "User"
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Utilizador Criado' ,
                            utilizador: user ,
                            request:{
                                type:'GET',
                                url: 'http://localhost:3000/users/' + result._id
                            }
                        });
                    })
                    .catch(err => { 
                        console.log(err);
                        res.status(500).json({error: err})
                    });
                }
        });
        }
    })
};
exports.users_login = (req, res, next) => {
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1 ) {
                return res.status(401).json({
                    message : 'Auth failed'
                });
            };
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                };
                if (result) {
                    const token = jwt.sign(
                        {
                        email: user[0].email,
                        userId : user[0]._id
                        }, 
                        process.env.JWT_KEY_USER,
                        {
                            expiresIn: "7days"
                        }
                    );
                    return res.status(200).json({
                        message : 'Auth sucessfull',
                        token: token ,
                        userId: user[0]._id
                    });
                }
                res.status(401).json({
                    message : 'Auth failed'
                });
            })
        })    
        .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
}
exports.users_get_id =  (req,res,next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('nome morada codigoPostal nTelemovel idade genero historico estadoTeste teste email')
    .exec()
    .then(doc =>{
        console.log("From database: ",doc);
        //Check if id is valid and existant
        if(doc){
            res.status(200).json({
                user: doc,
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/users'
                }
            });
        //If id is valid but not existant
         } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
    
};
exports.users_patch_id = (req,res,next) => {
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id:id},{ $set: updateOps })
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'User Updated',
            request:{
                type:'GET',
                url: 'http://localhost:3000/users/' + id
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
};
exports.users_delete_id = (req,res,next) => {
    const id = req.params.userId;
    //Remove objects that fullfil this criteria
    User.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'User Deleted',
            request:{
                type:'POST',
                url: 'http://localhost:3000/users/',
                body:{nome:'String',morada: 'String',codigoPostal: 'String',nTelemovel: 'Number',idade:'Number', genero: 'String',historico:'String', estadoTeste:'String',teste_1:'Boolean',teste_2:'Boolean'} 
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
};
exports.users_pw_change = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    // update it with hash
    bcrypt.hash(req.body.password , 10 ,  (err, hash) => {
        if (err) {
            return res.status(500).json({
                error:err
            });
        } else{
        updateOps.password = hash ;
        console.log(hash);
        User.update({_id:id},{ $set: updateOps })
        .exec()
        .then(result =>{
            res.status(200).json({
                message:'User Updated',
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/users/' + id
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        });
    }
    });
            
};

exports.user_tests_update = (req,res,next) => {
    const id = req.params.userId; 
    //const updateOps={};
    User.findById({_id:id})
    .then(user=>{
        if(!user){
            return res.status(404).json({
                message:"Utilizador não encontrado"
            })
        }
        user.update({
            $push : {
                teste :  {
                         "resultado": req.body.resultado,
                         "data": req.body.data
                       } //inserted data is the object to be inserted 
              }
        })
        .exec()
        .then(result =>{
            res.status(200).json({
                message:'Teste do User modificado',
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/users/' + id
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        }); 
    })
    
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });        
};
