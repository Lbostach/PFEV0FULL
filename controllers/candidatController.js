const Candidat = require('../models/Candidat');
const fs = require('fs');
const multer = require('multer');

const getCandidat = async(req, res) => {
    
    try {
        
        const candidatId = req.query.idCandidat;

        const candidat = await Candidat.findById(candidatId);

        res.status(200).json({ candidat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCandidat = async (req, res) => {
    try {
        const candidatId = req.query.idCandidat;
        
        const updatedCandidat = await Candidat.findByIdAndUpdate(candidatId, req.body , { new: true });
        if (!updatedCandidat) {
            return res.status(404).json({ message: 'Candidat not found' });
        }

        res.status(200).json({ candidat: updatedCandidat });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `./uploads/${req.query.idCandidat}/`;
      fs.access(dir, fs.constants.F_OK, (err) => {
        if (err) {
          return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir))
        }
        return cb(null, dir)
      })
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  const upload = multer({ storage: storage });

const updateCandidatPicture = async (req, res) => {
  try {
    const candidatId = req.query.idCandidat;
    const filePath = req.file.path;
    console.log(filePath);
    const updatedCandidat = await Candidat.findByIdAndUpdate(candidatId, { picture: filePath }, { new: true });
    if (!updatedCandidat) {
      return res.status(404).json({ message: 'Candidat not found' });
    }
    res.status(200).json({ candidat: updatedCandidat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./uploads/${req.query.idCandidat}/documents/`;
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        return fs.mkdir(dir, { recursive: true }, (error) => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload2 = multer({ storage: storage2 });

const updateCandidatDocuments = async (req, res) => {
  try {
    const candidatId = req.query.idCandidat;
    const filePath = req.file.path;
    console.log(filePath);

    // Retrieve the current Candidat document
    const candidat = await Candidat.findById(candidatId);
    if (!candidat) {
      return res.status(404).json({ message: 'Candidat not found' });
    }

    // Push the new path onto the documents array
    candidat.documents.push(filePath);

    // Save the updated Candidat document
    const updatedCandidat = await candidat.save();

    res.status(200).json({ candidat: updatedCandidat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { getCandidat, updateCandidat, updateCandidatPicture, upload, updateCandidatDocuments, upload2}