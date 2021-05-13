const express = require('express');
const router = express.Router();

const checkAuthTech = require('../middleware/check-auth-tech');
const checkAuthAdmin = require('../middleware/check-auth-admin');

const TechController = require('../controllers/techs');

//Returns all users from database
router.get('/',checkAuthAdmin, TechController.techs_get_all);

//Returns if a tech was created in database
router.post('/signup', checkAuthAdmin, TechController.tech_signup);

//Returns a token if a tech autheticates with given credentials 
router.post('/login', TechController.techs_login);

//Returns tech from database
router.get('/:techId', checkAuthTech, TechController.techs_get_id);

//Returns if tech was deleted
router.delete('/:techId', checkAuthAdmin, TechController.techs_delete);

//Returns if tech was updated
router.patch('/:techId', checkAuthTech ,TechController.techs_update);

//Returns if password was changed
router.patch('/pwchange/:techId', checkAuthTech, TechController.techs_pw_change);

module.exports = router;
