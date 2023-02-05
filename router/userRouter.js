const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth')

router.post('/addUser', userController.addUser);
router.get('',  userController.getUser);
router.post('/login', userController.login);
router.get('/userById/:id',auth,  userController.getUserById);
router.get('/getUserDetails', auth, userController.getCurrentUser);
router.post('/checkMail', userController.checkMail);
router.get('/getUserByMail', userController.getUserByMail);
router.post('/verifyOTP', userController.verifyOTP);
module.exports = router;