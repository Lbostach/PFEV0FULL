const Candidat = require('../models/Candidat');

const getCandidat = async(req, res) => {
    
    try {
        
        const candidatId = req.query.idCandidat;

        const candidat = await Candidat.findById(candidatId);

        res.status(200).json({ candidat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getCandidat }