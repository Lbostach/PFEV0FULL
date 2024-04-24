const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    datePublication: {
        type: Date,
        default: Date.now
    },
    dateLimite: {
        type: Date,
        required: true
    },
    prerequis: {
        type: String,
        required: true
    },
    niveauEtude: {
        type: String,
        required: true
    },
    idRecruteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruteur'
    },
    domaine: {
        type: String,
        required: true
    }
});

const Offre = mongoose.model('Offre', offreSchema);

module.exports = Offre;
