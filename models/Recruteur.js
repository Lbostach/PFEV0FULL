const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const recruteurSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nom: {
        type: String,
        required: true,
        unique: true
    },
    prenom: {
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

recruteurSchema.statics.login = async function(email, password) {
    const recruteur = await this.findOne({ email });
    if (recruteur) {
      const auth = await bcrypt.compare(password, recruteur.password);
      if (auth) {
        return recruteur;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
};


const Recruteur = mongoose.model('Recruteur', recruteurSchema);

module.exports = Recruteur;
