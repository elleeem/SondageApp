const mongoose = require("mongoose");

const SondageSchema = new mongoose.Schema({
  titre: { type: String, required: true, unique: true },
  questions: [
    {
      texte: { type: String, required: true },
      type: { type: String, enum: ["ouverte", "choix multiple"], required: true },
      options: [String] // Utilisé pour les choix multiples
    }
  ],
  createur: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }
});

module.exports = mongoose.model("Sondage", SondageSchema);
