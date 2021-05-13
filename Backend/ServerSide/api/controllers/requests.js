const mongoose = require('mongoose');

const Request = require('../models/request');
const User = require('../models/user');

exports.requests_get_all = (req,res,next) => {
Request.find()
//Only fetch this fields
.select('idUser sns presente resultadoClinico relatorioClinico')
.populate('user', 'nome morada codigoPostal nTelemovel idade genero historico estadoTeste testes')
.exec()
//Returns numbers os elements, data, and URL of request
.then(docs =>{
    const response = {
        count: docs.length,
        requests:docs.map(doc =>{
            return{
                req:doc,
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/requests/' + doc._id
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


exports.requests_get_id = (req,res,next) => {
    const id = req.params.requestId;
    Request.findById(id)
    .select('user sns presente resultadoClinico relatorioClinico')
    .exec()
    .then(doc=>{
        //Check if id is valid and existant
        if(!doc){
            return res.status(404).json({
                message: 'Pedido não encontrado'
            });
        }
        res.status(200).json({
            pedido : doc,
            request:{
                type:'GET',
                url: 'http://localhost:3000/requests'
            }
        });      
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
    
};

exports.requests_get_user = (req,res,next) => {
    const userId = req.params.userId;
    const j=0;
    Request.find({user :userId})
    .select('user sns presente resultadoClinico relatorioClinico')
    .populate('user', 'nome morada codigoPostal nTelemovel idade genero historico estadoTeste testes')
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            pedidos:docs.map(doc =>{
                return {
                    pedido : doc,
                }
            })
        }
        res.status(200).json(response); 
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
}

exports.requests_upload_pdf = (req,res,next) => {
    console.log(req.file);
    const id = req.params.requestId;
    Request.findById(id);
    const updateOps = {};
    const path = req.file.path;
    updateOps.relatorioClinico = path ;
    Request.update({_id:id},{ $set: updateOps })
    .exec()
    .then(result =>{
        res.status(200).json({
            message:'Relatorio submetido'
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
};
exports.request_post = (req,res,next) => {
    User.findById(req.body.userID)
    .then(user =>{
        if(!user){
            return res.status(404).json({
                message:"Utilizador não encontrado"
            })
        }
        const request = new Request({
            _id: new mongoose.Types.ObjectId(),
            user: req.body.userID,
            sns: req.body.sns,
            presente: req.body.presente
        });
        request.save()
        .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Pedido Criado' ,
            pedido : request ,
            request:{
                type:'GET',
                url: 'http://localhost:3000/requests/' + result._id
            }
        });
    }) 
    .catch(err =>{
        res.status(500).json({
            error:err
        });
    });
})
};
exports.requests_delete = (req,res,next) => {
    const id = req.params.requestId;
    //Remove objects that fullfil this criteria
    Request.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Pedido eliminado',
            request:{
                type:'POST',
                url: 'http://localhost:3000/requests/',
                body:{UserID:'String', sns:'Boolean',presente:'Boolean'} 
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });
};

exports.request_update= (req,res,next) => {
    const id = req.params.requestId; 
    Request.findById({_id:id})
    .then(request=>{
        if(!request){
            return res.status(404).json({
                message:"Pedido não encontrado"
            })
        }
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }

        Request.update({_id:id},{ $set: updateOps })
        .exec() 
        .then(result =>{
            res.status(200).json({
                message:'Pedido modificado',
                request:{
                    type:'GET',
                    url: 'http://localhost:3000/requests/' + id
                }
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({error: err})
        })
    })   
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err})
    });        
};