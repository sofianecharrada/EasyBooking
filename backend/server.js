require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Connecté à MongoDB");
    }
  })
  .catch(err => console.error("Erreur MongoDB :", err));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/rooms", require("./src/routes/roomRoutes"));
app.use("/api/bookings", require("./src/routes/bookingRoutes"));

// ⚠️ Démarrer le serveur UNIQUEMENT hors tests
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Serveur EasyBooking lancé sur le port ${PORT}`);
  });
}

// ✅ Export EXPRESS APP (OBLIGATOIRE pour Supertest)
module.exports = app;
