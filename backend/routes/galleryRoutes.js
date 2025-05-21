const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");
const verifyToken = require("../middleware/auth");

// Configurare multer pentru salvare locală
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ex: 1612345678901.jpg
  },
});

const upload = multer({ storage });

// Ruta pentru a prelua toate pozele
router.get("/", async (req, res) => {
  try {
    const photos = await Gallery.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (err) {
    res.status(500).json({ msg: "Eroare la încărcarea pozelor" });
  }
});

// Ruta nouă pentru upload cu fișier local (face și salvarea în DB)
router.post(
  "/upload",
  verifyToken,
  upload.single("image"), // "image" este numele câmpului din formData
  async (req, res) => {
    if (!req.file) return res.status(400).json({ msg: "Fișierul este necesar." });

    try {
      const photo = new Gallery({
        user: req.user.id,
        imageUrl: `/uploads/${req.file.filename}`, // Calea accesibilă pentru client
        description: req.body.description,
      });

      await photo.save();
      res.json(photo);
    } catch (err) {
      res.status(500).json({ msg: "Eroare la salvarea imaginii" });
    }
  }
);

module.exports = router;
