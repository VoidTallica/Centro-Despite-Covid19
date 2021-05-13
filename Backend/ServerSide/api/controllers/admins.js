const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin');
const Tech = require('../models/tech');
const User = require('../models/user');

exports.admin_get_all = (req,res,next) => {
    Admin.find()
    //Only fetch this fields
    .select('_id email')
    .exec().
    //Returns numbers os elements, data, and URL of user
    then(docs =>{
        const response = {
            count: docs.length,
            admin:docs.map(doc =>{
                return{
                    admin: doc,
                    request:{
                        type:'GET',
                        url: 'http://localhost:3000/admins/' + doc._id
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

exports.admin_signup = (req,res,next) => {
    Admin.find({email : req.body.email})
    .exec()
    .then(admin =>{
        if (admin.length >= 1) {
            return res.status(409).json({
                message : 'Mail existente'
            })
        } 
        else 
        {
            bcrypt.hash(req.body.password, 10, (err, hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    });
                } else{
                    const admin = new Admin({
                        _id:new mongoose.Types.ObjectId(),
                        email:req.body.email,
                        password: hash
                    });
                    admin
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'Admin Criado' ,
                            admin: admin 
                            }
                        
                        )
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

exports.admin_login = (req, res, next) =>{
    Admin.find({email: req.body.email})
    .exec()
    .then(admin => {
        if (admin.length < 1 ) {
            return res.status(401).json({
                message : 'Auth failed'
            });
        };
        bcrypt.compare(req.body.password, admin[0].password, (error, result) => {
            if (error) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            };
            if (result) {
                const token = jwt.sign(
                    {
                    email: admin[0].email,
                    adminId : admin[0]._id
                    }, 
                    process.env.JWT_KEY_ADMIN,
                    {
                        expiresIn: "7days"
                    }
                );
                return res.status(200).json({
                    message : 'Auth sucessfull',
                    token: token,
                    userId: admin[0]._id
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

exports.admin_pw_change = (req, res, next) => {
    const id = req.params.adminId;
    const updateOps = {};
    
    // Update it with hash
    bcrypt.hash(req.body.password , 10 ,  (err, hash) => {
        if (err) {
            return res.status(500).json({
                error:err
            });
        } 
        else
        {
            updateOps.password = hash ;
            console.log(hash);
            Admin.update({_id:id},{ $set: updateOps })
            .exec()
            .then(result =>{
                res.status(200).json({
                    message:'Admin Updated'
                });
            })
            .catch(err =>{
                console.log(err);
                res.status(500).json({error: err})
            });
        }
    });        
};

exports.user_tests_made =  (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .then(doc=>{
        //Check if id is valid and existant
        if(!doc){
            return res.status(404).json({
                message: 'Pedido não encontrado'
            });
        }
        const count = doc.teste.length; 
        res.status(200).json({
            message:"Numero de testes realizados pelo utilizador dado : "+count
        });
        return count;
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });   
};

exports.case_day = (req, res, next) => {
    const given_day = req.body.data;
    console.log(given_day);
    console.log(req.body);
    User.find()
    .exec()
    .then(doc=>{

    User.aggregate([
        { "$unwind": "$teste" },
        { "$match": { "teste.data": given_day } },
        { "$group": {
          "_id": null,
          "total": { "$sum": 1 },
        }
    }]
    ,function(err, result) {
        //If there is no test in a given day
        if(result == ''){
            res.status(200).json({
                message:"Em "+ given_day +" o numero de testes realizados foi : 0 "
            });
        }  
        //If there is tests in a given day
        else{
            res.status(200).json({
                message:"Em "+ given_day +" o numero de testes realizados foi : "+ result[0]['total']
            });
        }
    });   
    })  
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });          
};

exports.total_positive = (req, res, next) => {
    User.count({historico:true}, function(err, result) {
        console.log(result);
        if(!result){
            res.status(400).json({
                message:"Não há pessoas infetadas"
            });
        }
        else{
            res.status(200).json({
                message:"Existem "+result+" pessoas infetadas"
            });
        }
    })
};