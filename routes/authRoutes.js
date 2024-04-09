//get it from the express package
const { Router }= require('express');
const authController = require('../controllers/authController');
const offreController = require('../controllers/offreController');
const router = Router();

//we use middleware to verify if user is logged in before accessing routes that need authentication. 
router.get('/Api/signup',authController.signup_get);
router.post('/Api/signup',authController.signup_post);
router.get('Api/login',authController.login_get);
router.post('/Api/login',authController.login_post);
router.get('/Api/logout', authController.logout_get);


// Routes to add,delete and update a new offer
router.post('/Api/offres', offreController.addOffre);
router.delete('/Api/offres/:id', offreController.deleteOffre);
router.put('/Api/offres/:id', offreController.updateOffre);

module.exports = router;
