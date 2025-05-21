const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configurare storage cu multer (unde și cum se salvează fișierele)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder unde salvăm imagini
  },
  filename: function (req, file, cb) {
    // Salvează cu timestamp + nume original ca să nu se suprascrie
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Ruta POST care primește un fișier cu cheia 'image'
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: "Nu s-a încărcat niciun fișier" });
  }
  // Returnează calea unde a fost salvat fișierul, o poți salva în baza ta
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
