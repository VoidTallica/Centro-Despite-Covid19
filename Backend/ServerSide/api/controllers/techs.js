const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const Request = require('../models/request');
const Tech = require('../models/tech');
const User = require('../models/user');

exports.techs_get_all = (req, res, next) =>{
    Tech.find()
    //Only fetch this fields
    .select('nome email')
    .exec().
    //Returns numbers os elements, data, and URL of user
    then(docs =>{
        const response = {
            count: docs.length,
            techs:docs.map(doc =>{
                return{
                    tech: doc,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/tech/' + doc._id
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

exports.tech_signup = (req, res, next) => {
    Tech
    .find({email : req.body.email})
    .exec()
    .then(tech =>{
        if (tech.length >= 1) {
            return res.status(409).json({
                message : 'Mail existente'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash)=> {
                if (err) {
                    return res.status(500).json({
                        error:err
                    });
                } else{
                    const tech = new Tech({
                        _id:new mongoose.Types.ObjectId(),
                        nome: req.body.nome,
                        email:req.body.email,
                        password: hash
                    });
                    tech
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Tecnico Criado' ,
                            tecnico : tech ,
                            request:{
                                type:'GET',
                                url: 'http://localhost:3000/techs/' + result._id
                            }
                        });
                    }) 
                    .catch(err =>{
                        console.log(err);
                        res.status(500).json({error:err});
                    });
                }
            });
        };
    })
};

exports.techs_login = (req, res, next) =>{
    Tech.find({email: req.body.email})
        .exec()
        .then(tech => {
            if (tech.length < 1 ) {
                return res.status(401).json({
                    message : 'Auth failed'
                });
            };
            bcrypt.compare(req.body.password, tech[0].password, (error, result) => {
                if (error) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                };
                if (result) {
                    const token = jwt.sign(
                        {
                        email: tech[0].email,
                        userId : tech[0]._id
                        }, 
                        process.env.JWT_KEY_TECH,
                        {
                            expiresIn: "7days"
                        }
                    );
                    return res.status(200).json({
                        message : 'Auth sucessfull',
                        token: token ,
                        userId: tech[0]._id
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
    };

exports.techs_get_id = (req,res,next) => {
    const id = req.params.techId;
    Tech.findById(id)
    .select('nome email')
    .exec()
    .then(doc =>{
        console.log("From database: ",doc);
        //Check if id is valid and existant
        if(doc){
            res.status(200).json({
                tech: doc,
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

exports.techs_delete = (req,res,next) => {
    const id = req.params.techId;
    //Remove objects that fullfil this criteria
    Tech.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Tech eliminado',
            request:{
                type:'POST',
                url: 'http://localhost:3000/techs/',
                body:{nome:'String'} 
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
};

exports.techs_update = (req,res,next) => {
    const id = req.params.techId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Tech.update({_id:id},{ $set: updateOps })
    .then(result =>{
        res.status(200).json({
            message:'Tecnico modificado',
            request:{
                type:'GET',
                url: 'http://localhost:3000/techs/' + id
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    }); 
};

exports.techs_pw_change =  (req, res, next) => {
    const id = req.params.techId;
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
        Tech.update({_id:id},{ $set: updateOps })
        .exec()
        .then(result =>{
            res.status(200).json({
                message:'Tech Updated',
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/techs/' + id
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