const Candidat = require('../models/Candidat');
const jwt = require('jsonwebtoken');

//handle err
const handleErrors = (err)=>{
console.log(err.message,err.code);
let errors = {email:'',password:''};

// incorrect email

if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
}

// incorrect password
if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
}
//duplicate err code
if (err.code === 11000){
    errors.email='that email is already registered';
    return errors;
}

//validation err
if(err.message.includes('candidat validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path]= properties.message;
    });  
}
return errors;
}

const maxAge= 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({ id },'app secrets',{
        expiresIn : maxAge
    });
}

module.exports.signup_get=(req,res)=>{
    res.render('signup',{title:'signup'});
}
module.exports.signup_post= async (req,res) => {
    const {firstName,lastName,email,password}=req.body;

    try{
      const candidat = await Candidat.create({ firstName,lastName,email,password });
      const token = createToken(candidat._id);
      res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(201).json({candidat: candidat._id }); 
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}
module.exports.login_get=(req,res)=>{
    res.render('login',{title:'login'});
}
module.exports.login_post=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const candidat = await Candidat.login(email, password);
        const token = createToken(candidat._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ candidat: candidat._id });
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
      
}
module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}