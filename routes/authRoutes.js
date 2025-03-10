const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Utilisateur = require("../models/Utilisateur");

const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;

    // Vérification d'un utilisateur existant
    const utilisateurExistant = await Utilisateur.findOne({ email });
    if (utilisateurExistant) return res.status(400).json({ message: "Cet email est déjà utilisé" });

    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Création d'un nouvel utilisateur
    const nouvelUtilisateur = new Utilisateur({ pseudo, email, password: hashPassword });
    await nouvelUtilisateur.save();

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification d'un utilisateur existant
    const utilisateur = await Utilisateur.findOne({ email });
    if (!utilisateur) return res.status(400).json({ message: "Utilisateur non trouvé" });

    // Vérification du mot de passe
    const estValide = await bcrypt.compare(password, utilisateur.password);
    if (!estValide) return res.status(400).json({ message: "Mot de passe incorrect" });

    // Générer un token JWT
    const token = jwt.sign({ id: utilisateur._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, utilisateur: { id: utilisateur._id, pseudo: utilisateur.pseudo, email: utilisateur.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
