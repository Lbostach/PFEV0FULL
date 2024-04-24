const Offre = require("../models/Offre");
const Recruteur = require("../models/Recruteur");
const Candidat = require("../models/Candidat");
const nodemailer = require("nodemailer");

// Function to add a new offer
const addOffre = async (req, res) => {
  try {
    const nouvelleOffre = await Offre.create(req.body);
    res.status(201).json({ offre: nouvelleOffre });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get all offers
const getOffres = async (req, res) => {
  try {
    const offres = await Offre.find();
    res.json({ offres });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to get offers by recruteurId
const getOffresByRecruteurId = async (req, res) => {
  try {
    if (!req.query.idRecruteur) {
      return res.status(400).json({ message: "idRecruteur is required" });
    }
    const offres = await Offre.find({ idRecruteur: req.query.idRecruteur });
    res.json({ offres });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to delete an offer
const deleteOffre = async (req, res) => {
  try {
    const offreSupprimee = await Offre.findByIdAndDelete(req.params.id);
    if (!offreSupprimee) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }
    res.json({ message: "Offre supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to update an offer
const updateOffre = async (req, res) => {
    try {
      const offreMiseAJour = await Offre.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true, useFindAndModify: false }
      );
      if (!offreMiseAJour) {
        return res.status(404).json({ message: 'Offre non trouvée' });
      }
      res.json({ offre: offreMiseAJour });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Function to handle applying for an offer
const postulerOffre = async (req, res) => {
  try {
    const offreId = req.params.offreId;
    const candidatId = req.user.id; // Assuming you have authentication middleware that sets req.user with the current user's information
    const candidat = await Candidat.findById(candidatId);
    const offre = await Offre.findById(offreId).populate("recruteur");

    if (!offre) {
      return res.status(404).json({ message: "Offre non trouvée" });
    }

    const recruteur = offre.recruteur;

    // Create a new candidature
    const nouvelleCandidature = await Candidature.create({
      idOffre: offreId,
      idRecruteur: recruteur._id,
      idCandidat: candidatId,
    });

    // Send an email to the recruiter with the candidate's information
    const transporter = nodemailer.createTransport({
      // Configure your email transporter here
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: recruteur.email,
      subject: "Candidature pour votre offre",
      text: `Bonjour ${recruteur.nom},\n\nVous avez reçu une nouvelle candidature pour votre offre: "${offre.titre}".\n\nInformations du candidat:\nNom: ${candidat.nom}\nEmail: ${candidat.email}\nTéléphone: ${candidat.telephone}\n\nCordialement,\nVotre application`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res
          .status(500)
          .json({
            message:
              "Une erreur s'est produite lors de l'envoi de l'email au recruteur",
          });
      } else {
        console.log("Email sent:", info.response);
        res
          .status(200)
          .json({
            message: "Candidature envoyée avec succès au recruteur",
            candidature: nouvelleCandidature,
          });
      }
    });
  } catch (error) {
    console.error("Error applying for offer:", error);
    res
      .status(500)
      .json({
        message: "Une erreur s'est produite lors de l'envoi de la candidature",
      });
  }
};
module.exports = {
  addOffre,
  getOffres,
  deleteOffre,
  updateOffre,
  postulerOffre,
  getOffresByRecruteurId,
};
