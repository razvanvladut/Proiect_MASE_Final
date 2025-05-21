const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Attraction = require("../models/Attraction");
const verifyToken = require("../middleware/auth");

// Configurare multer pentru upload în folderul frontend/public/images (doar pentru admin)
const storageImages = multer.diskStorage({
  destination: (req, file, cb) => {
    // folderul relativ din backend spre frontend public images
    cb(null, path.join(__dirname, '../../frontend/public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ex: 1683001234567.jpg
  },
});
const uploadImages = multer({ storage: storageImages });

// Ruta GET pentru atracții
router.get("/", async (req, res) => {
  try {
    const list = await Attraction.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ msg: "Eroare la preluarea atracțiilor" });
  }
});

// Ruta POST pentru adăugarea unei atracții (doar admin), cu upload imagine în images
router.post(
  "/",
  verifyToken,
  uploadImages.single("image"), // multer folosește storageImages
  async (req, res) => {
    if (!req.user.isAdmin)
      return res.status(403).json({ msg: "Doar adminul poate adauga" });

    const { name, description, location } = req.body;

    if (!req.file)
      return res.status(400).json({ msg: "Imaginea este obligatorie" });

    let parsedLocation = null;
    try {
      parsedLocation = location ? JSON.parse(location) : null;
    } catch (err) {
      return res.status(400).json({ msg: "Locația este invalidă" });
    }

    const imageUrl = `/images/${req.file.filename}`;

    const attraction = new Attraction({
      name,
      description,
      imageUrl,
      location: parsedLocation,
    });

    try {
      await attraction.save();
      res.json(attraction);
    } catch (err) {
      res.status(500).json({ msg: "Eroare la salvarea atracției" });
    }
  }
);

// Ruta DELETE pentru ștergerea unei atracții (doar admin)
router.delete("/:id", verifyToken, async (req, res) => {
  if (!req.user.isAdmin)
    return res.status(403).json({ msg: "Doar adminul poate sterge" });

  try {
    await Attraction.findByIdAndDelete(req.params.id);
    res.json({ msg: "Sters cu succes" });
  } catch (err) {
    res.status(500).json({ msg: "Eroare la ștergerea atracției" });
  }
});

module.exports = router;
