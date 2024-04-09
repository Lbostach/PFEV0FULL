const Offre = require('../models/Offre');

// Function to add a new offer
const addOffre = async (req, res) => {
    try {
        const nouvelleOffre = await Offre.create(req.body);
        res.status(201).json({ offre: nouvelleOffre });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Function to delete an offer
const deleteOffre = async (req, res) => {
    try {
        const offreSupprimee = await Offre.findByIdAndDelete(req.params.id);
        if (!offreSupprimee) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.json({ message: 'Offre supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to update an offer
const updateOffre = async (req, res) => {
    try {
        const offreMiseAJour = await Offre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offreMiseAJour) {
            return res.status(404).json({ message: 'Offre non trouvée' });
        }
        res.json({ offre: offreMiseAJour });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addOffre,
    deleteOffre,
    updateOffre
};
