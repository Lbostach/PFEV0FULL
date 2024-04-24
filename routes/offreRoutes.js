const { Router }= require('express');
const authController = require('../controllers/authController');
const offreController = require('../controllers/offreController');
const router = Router();



router.post('/Api/offres', offreController.addOffre);
// Routes to add,delete and update a new offer
router.get('/Api/offres', offreController.getOffres);
router.delete('/Api/offres/:id', offreController.deleteOffre);
router.put('/Api/offres/:id', offreController.updateOffre);
router.get('/Api/recruteurs/offres',offreController.getOffresByRecruteurId);

module.exports = router;
