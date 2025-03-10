const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Accès refusé. Pas de token fourni." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.utilisateur = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide." });
  }
};
