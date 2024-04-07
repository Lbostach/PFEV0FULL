const mongoose = require('mongoose');
const {isEmail } = require('validator');
const bcrypt = require('bcrypt');

// Define the schema for the candidat collection
const candidatSchema = new mongoose.Schema({
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
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password: {
        type: String,
        required:[true,'Please enter a password'],
        minLength:[6,'Minimum password longth is 6 characters']
    },
    studyLevel: {
        type: String
    },
    domain: {
        type: String
    },
    skills: {
        type: [String]
    },
    documents: {
        type: [String]
    },
    picture: {
        type: String
    }
});

candidatSchema.post('save',function(doc,next){
    console.log('new candidat was created & saved',doc);
    next();
});
//fire a function before doc saved to db
candidatSchema.pre('save', async function(next){
    const salt =await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt) ;//hashing the password
    next();
});
// static method to login candidat
candidatSchema.statics.login = async function(email, password) {
    const candidat = await this.findOne({ email });
    if (candidat) {
      const auth = await bcrypt.compare(password, candidat.password);
      if (auth) {
        return candidat;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

// Create the Candidat model based on the schema
const Candidat = mongoose.model('candidat', candidatSchema);

// Export the model
module.exports = Candidat;
