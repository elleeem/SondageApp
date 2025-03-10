const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);
