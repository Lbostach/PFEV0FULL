const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const candidatureRoutes = require('./routes/candidatureRoutes');
const offreRoutes = require('./routes/offreRoutes');
const recruteurRoutes = require('./routes/recruteurRoutes');
const candidatRoutes = require('./routes/candidatRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkCandidat } = require('./middleware/authMiddleware');
const socket = require('socket.io');
const path = require('path');
const fs = require('fs');
const Offre = require('./models/Offre');


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://recrutement:7FuNmWUbzd8cNv75@cluster0.75dg1bl.mongodb.net/recrutement")
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('*', checkCandidat);
app.use(authRoutes,recruteurRoutes,offreRoutes,candidatureRoutes,candidatRoutes);
app.use('/uploads/:idCandidat/:filename', (req, res, next) => {
  const filePath = path.join(__dirname, 'uploads', req.params.idCandidat, req.params.filename);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File ${filePath} does not exist`);
      res.status(404).send('File not found');
    } else {
      res.sendFile(filePath);
    }
  });
});

app.use('/uploads/:idCandidat/documents/:filename', (req, res, next) => {
  const filePath = path.join(__dirname, 'uploads', req.params.idCandidat, 'documents',req.params.filename);
  
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File ${filePath} does not exist`);
      res.status(404).send('File not found');
    } else {
      res.sendFile(filePath);
    }
  });
});

async function deleteExpiredOffres() {
  const now = new Date();
  await Offre.deleteMany({ dateLimite: { $lt: now } });
}

deleteExpiredOffres().catch(console.error);

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
