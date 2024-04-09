const mongoose = require('mongoose');
const {Candidat} = require('../models/Candidat');
const {Offre} = require('../models/Offre');
const {Recruteur} = require('../models/Recruteur');

const candidatureSchema = new mongoose.Schema({
    idOffre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offre'
    },
    idRecruteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruteur'
    },
    idCandidat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat'
    }
});

const Candidature = mongoose.model('Candidature', candidatureSchema);

module.exports = Candidature;
