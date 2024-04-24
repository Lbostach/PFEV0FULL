const express = require('express');
const router = express.Router();
const candidatureController = require('../controllers/candidatureController');

// Route to add a new candidature
router.post('/Api/candidatures', candidatureController.postulerOffre);

// Route to get all candidatures
router.get('/Api/candidatures', candidatureController.getCandidatures);

// Route to delete a candidature
router.delete('/Api/candidatures/:id', candidatureController.deleteCandidature);

module.exports = router;
