const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Config multer pentru folderul uploads
const storageUploads = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadUploads = multer({ storage: storageUploads });

// Exemplu de upload (modifică după cum trebuie pentru cazul tău)
router.post("/upload", uploadUploads.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "Nu s-a trimis fișier." });

  // Poți salva info în baza de date aici dacă e nevoie

  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

module.exports = router;
