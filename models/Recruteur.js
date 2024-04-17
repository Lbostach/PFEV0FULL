const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const recruteurSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

recruteurSchema.pre('save', async function(next) {
    const recruteur = this;
    if (!recruteur.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(recruteur.password, salt);
        recruteur.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

recruteurSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const Recruteur = mongoose.model('Recruteur', recruteurSchema);

module.exports = Recruteur;
