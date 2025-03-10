require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Route de test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'application de sondage !");
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));


const sondageRoutes = require("./routes/sondageRoutes");
app.use("/api/sondages", sondageRoutes);

//Routes d'authentification
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);


