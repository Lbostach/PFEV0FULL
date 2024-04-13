const Candidature = require('../models/Candidature');

// Controller method to add a new candidature
const addCandidature = async (req, res) => {
  try {
    const nouvelleCandidature = await Candidature.create(req.body);
    res.status(201).json({ candidature: nouvelleCandidature });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller method to get all candidatures
const getCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find();
    res.status(200).json({ candidatures });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller method to delete a candidature
const deleteCandidature = async (req, res) => {
  try {
    const candidatureSupprimee = await Candidature.findByIdAndDelete(req.params.id);
    if (!candidatureSupprimee) {
      return res.status(404).json({ message: 'Candidature non trouvée' });
    }
    res.json({ message: 'Candidature supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCandidature, getCandidatures, deleteCandidature };
