//get it from the express package
const { Router }= require('express');
const authController = require('../controllers/authController');
const router = Router();

router.get('/Api/signup',authController.signup_get);
router.post('/Api/signup',authController.signup_post);
router.get('Api/login',authController.login_get);
router.post('/Api/login',authController.login_post);
router.get('/Api/logout', authController.logout_get);

module.exports = router;