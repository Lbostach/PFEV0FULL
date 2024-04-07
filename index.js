const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkCandidat } = require('./middleware/authMiddleware');
const socket = require('socket.io');


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
app.use(authRoutes);
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
