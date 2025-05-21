const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const userUploadRoutes = require("./routes/userUploadRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Import rute
const userRoutes = require('./routes/userRoutes');
const attractionRoutes = require('./routes/attractionRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
// Sterge uploadRoutes ca sa nu interfereze
// const uploadRoutes = require('./routes/upload');

app.use("/api/users", userRoutes);
app.use("/api/attractions", attractionRoutes);
app.use("/api/gallery", galleryRoutes);
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images')));
app.use("/api/user-upload", userUploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
// Servește fișierele statice din React
app.use(express.static(path.join(__dirname, '../frontend/build')));

// // Pentru orice altă rută ne-API, trimite index.html din React
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectat"))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server pornit pe portul ${process.env.PORT}`);
});
