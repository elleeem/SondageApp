const express = require("express");
const Sondage = require("../models/Sondage");
const auth = require("../middleware/auth");
const mongoose = require('mongoose');
const router = express.Router();

const app = express();
app.use(express.json());

//Création du sondage
router.post("/", auth, async (req, res) => {
  try {
    const { titre, questions } = req.body;
    const nouveauSondage = new Sondage({ titre, questions, createur: req.utilisateur.id });
    await nouveauSondage.save();
    res.status(201).json(nouveauSondage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupération de tous les sondages
router.get("/", async (req, res) => {
  const sondages = await Sondage.find();
  res.json(sondages);
});

//Suppression d'un sondage
router.delete("/:id", auth, async (req, res) => {
  try {
    const sondage = await Sondage.findById(req.params.id);
    if (!sondage) return res.status(404).json({ message: "Sondage non trouvé" });

    if (sondage.createur.toString() !== req.utilisateur.id) {
      return res.status(403).json({ message: "Vous n'avez pas le droit de supprimer ce sondage" });
    }

    await Sondage.findByIdAndDelete(req.params.id);
    res.json({ message: "Sondage supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mise à jour du sondage
router.put("/:id", auth, async (req, res) => {
  try {
    const { titre, questions } = req.body;

    // Vérification de l'existance du sondage
    const sondage = await Sondage.findById(req.params.id);
    if (!sondage) return res.status(404).json({ message: "Sondage non trouvé" });

    // Vérifier si l'utilisateur est le créateur
    if (sondage.createur.toString() !== req.utilisateur.id) {
      return res.status(403).json({ message: "Vous n'avez pas le droit de modifier ce sondage" });
    }

    // Mise à jour du sondage
    sondage.titre = titre || sondage.titre;
    sondage.questions = questions || sondage.questions;

    const sondageModifie = await sondage.save();
    res.json(sondageModifie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Récupération de tous les sondages stockés dans la base
router.get("/", async (req, res) => {
  try {
    const sondages = await Sondage.find();
    res.json(sondages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Récupération d'un sondage précis 
router.get("/:id", async (req, res) => {
  try {
    const sondage = await Sondage.findById(req.params.id);
    if (!sondage) return res.status(404).json({ message: "Sondage non trouvé" });

    res.json(sondage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Modèle pour la Réponse
const Reponse = mongoose.model('Reponse', new mongoose.Schema({
  sondageId: String,
  reponses: Object, // Les réponses sont stockées sous forme d'objet
}));

// Route pour reception de réponses
app.post('/api/sondages/repondre', async (req, res) => {
  try {
    const { sondageId, reponses } = req.body;

    // Création d'une nouvelle réponse dans la base de données
    const nouvelleReponse = new Reponse({
      sondageId,
      reponses,
    });

    // Sauvegarder la réponse
    await nouvelleReponse.save();
    res.status(200).json({ message: 'Réponses enregistrées avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement des réponses', error });
  }
});
module.exports = router;
