const express = require('express');
const router = express.Router();
const checkAuthUser = require('../middleware/check-auth-user');
const checkAuthTech = require('../middleware/check-auth-tech');

const UserController = require('../controllers/users');

//Returns all users from database
router.get('/', checkAuthTech, UserController.users_get_all);
    
//Returns if user was created in database
router.post('/signup', UserController.users_signup);

//Returns a token if a user autheticates with given credentials  
router.post('/login', UserController.users_login);

//Returns user from database
router.get('/:userId', checkAuthUser, UserController.users_get_id);

//Returns if user was updated
router.patch('/:userId', checkAuthUser, UserController.users_patch_id);

//Returns if user was deleted
router.delete('/:userId', checkAuthUser, UserController.users_delete_id);

//Returns if password was changed
router.patch('/pwchange/:userId', checkAuthUser, UserController.users_pw_change);

//Returns if test was added to the user 
router.patch('/tests/:userId', checkAuthTech, UserController.user_tests_update);

module.exports = router;