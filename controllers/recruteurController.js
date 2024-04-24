const Recruteur = require('../models/Recruteur');

// Fonction pour créer un nouveau recruteur
const createRecruteur = async (req, res) => {
    try {
        const { email, password } = req.body;
        const recruteur = await Recruteur.create({ email, password });
        res.status(201).json({ recruteur });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getRecruteur = async(req, res) => {
    
    try {
        
        const recruteurId = req.query.idRecruteur;

        const recruteur = await Recruteur.findById(recruteurId);

        res.status(200).json({ recruteur });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




module.exports = {
    createRecruteur,
    getRecruteur
};
