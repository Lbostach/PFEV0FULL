const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');

router.get('/Api/candidat', candidatController.getCandidat);


module.exports = router;