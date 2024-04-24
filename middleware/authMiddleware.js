const jwt = require('jsonwebtoken');
const Candidat = require('../models/Candidat');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, 'app secrets', (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.redirect('/login');
        } else {
            console.log(decodedToken);
            next();
        }
    });
    } else {
        res.redirect('/login');
    }
};

// check current Candidat
const checkCandidat = (req, res, next) => {
const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'app secrets', async (err, decodedToken) => {
      if (err) {
        res.locals.candidat = null;
        req.user= null;
        next();
      } else {
        let candidat = await candidat.findById(decodedToken.id);
        res.locals.candidat = candidat;
        req.user = candidat;
        next(); 
      }
    });
  } else {
    res.locals.candidat = null;
    req.user = null;
    next();
  }
};

module.exports = { requireAuth, checkCandidat };