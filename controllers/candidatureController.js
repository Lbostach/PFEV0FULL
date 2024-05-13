const Candidature = require('../models/Candidature');
const Candidat = require('../models/Candidat');
const Offre = require('../models/Offre');
const nodemailer = require('nodemailer');

// Controller method to add a new candidature


const postulerOffre = async (req, res) => {
  try {
      const offreId = req.body.offreId;
      const candidatId = req.body.candidatId; // Assuming you have authentication middleware that sets req.user with the current user's information
      const candidat = await Candidat.findById(candidatId);
      const offre = await Offre.findById(offreId).populate('idRecruteur');
      
      if (!offre) {
          return res.status(404).json({ message: 'Offre non trouvée' });
      }
      
      const idRecruteur = offre.idRecruteur;

      // Create a new candidature
      const nouvelleCandidature = await Candidature.create({
          idOffre: offreId,
          idRecruteur: idRecruteur,
          idCandidat: candidatId
      });

      res.status(201).json(nouvelleCandidature);

   

     
      
  } catch (error) {
      console.error('Error applying for offer:', error);
      res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'envoi de la candidature' });
  }
};

// Controller method to get all candidatures
const getCandidatures = async (req, res) => {
  try {
    const candidatures = await Candidature.find(req.query).populate('idOffre');
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

module.exports = { postulerOffre, getCandidatures, deleteCandidature };
