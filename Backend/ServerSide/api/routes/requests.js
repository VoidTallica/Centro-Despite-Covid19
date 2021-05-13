const express = require('express');
const router = express.Router();
const multer = require('multer');

const checkAuthTech = require('../middleware/check-auth-tech');
const checkAuthUser = require('../middleware/check-auth-user');

const RequestController = require('../controllers/requests');

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf'){
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter : fileFilter
});

//Returns all requests from database
router.get('/',checkAuthTech, RequestController.requests_get_all);

//Returns if request was created in database
router.post('/', checkAuthUser, RequestController.request_post);

//Returns request from database
router.get('/:requestId',checkAuthUser, RequestController.requests_get_id);

//Returns user requests from database
router.get('/user/:userId',checkAuthUser, RequestController.requests_get_user);

//Returns if request was changed
router.patch('/:requestId', checkAuthTech, RequestController.request_update);

//Returns if request was deleted
router.delete('/:requestId', checkAuthTech, RequestController.requests_delete);

//Returns if file was uploaded with given request
router.patch('/upload/:requestId', checkAuthTech , upload.single('relatorioClinico'), RequestController.requests_upload_pdf);   

module.exports = router;