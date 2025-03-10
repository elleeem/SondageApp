// routes/responses.js
const express = require('express');
const router = express.Router();
const Reponse = require('../models/Reponse');
const { authenticate } = require('../middleware/auth');

// Route pour soumettre des réponses au sondage
router.post('/:sondageId', authenticate, async (req, res) => {
  try {
    const { sondageId } = req.params;
    const { reponses } = req.body

    // Création d'une nouvelle réponse
    const reponse = new Reponse({
      utilisateurId: req.utilisateur._id, // L'utilisateur doit être authentifié
      sondageId,
      reponses,
    });

    await reponse.save();
    res.status(201).json({ message: 'Réponses soumises avec succès' });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la soumission des réponses' });
  }
});

// routes/responses.js
router.get('/:sondageId', async (req, res) => {
  try {
    const { sondageId } = req.params;
    const reponses = await Reponse.find({ sondageId }).populate('sondage.questionId');
    
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des réponses' });
  }
});

module.exports = router;
