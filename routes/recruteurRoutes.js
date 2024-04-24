const express = require('express');
const router = express.Router();
const recruteurController = require('../controllers/recruteurController');

// Endpoint pour créer un nouveau recruteur
router.post('/Api/recruteurs', recruteurController.createRecruteur);
router.get('/Api/recruteurs', recruteurController.getRecruteur);

module.exports = router;
