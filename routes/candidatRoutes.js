const express = require('express');
const router = express.Router();
const candidatController = require('../controllers/candidatController');

router.get('/Api/candidat', candidatController.getCandidat);
router.put('/Api/candidat', candidatController.updateCandidat);
router.put('/Api/candidat/picture', candidatController.upload.single('file'), candidatController.updateCandidatPicture);
router.put('/Api/candidat/documents', candidatController.upload2.single('file'), candidatController.updateCandidatDocuments);


module.exports = router;