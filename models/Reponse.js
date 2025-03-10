// models/Reponse.js
const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
  sondageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sondage' },
  reponse: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      answer: mongoose.Schema.Types.Mixed, // Peut être un texte ou un tableau pour les réponses à choix multiples
    },
  ],
});

const Reponse = mongoose.model('Reponse', reponseSchema);
module.exports = Reponse;
