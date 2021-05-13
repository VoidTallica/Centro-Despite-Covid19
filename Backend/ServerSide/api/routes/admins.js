const express = require('express');
const router = express.Router();

const checkAuthAdmin = require('../middleware/check-auth-admin');

const AdminController = require('../controllers/admins');

//Returns all admins
router.get('/', checkAuthAdmin , AdminController.admin_get_all);

//Returns if Admin was created in database
router.post('/signup', AdminController.admin_signup);

//Returns a token if an admin autheticates with given credentials 
router.post('/login', AdminController.admin_login);

//Returns if admin password was changed
router.patch('/pwchange/:adminId', checkAuthAdmin, AdminController.admin_pw_change);

//Returns the number of tests made by a user
router.get('/dataInfo_tests/:userId', checkAuthAdmin,AdminController.user_tests_made);

//Returns the number of cases in one given day
router.post('/dataInfo_cases_day', checkAuthAdmin, AdminController.case_day);

//Returns the number of all positive cases
router.get('/dataInfo_infected', checkAuthAdmin, AdminController.total_positive);

module.exports = router;