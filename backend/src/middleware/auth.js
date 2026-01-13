const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le Bearer Token
  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.id; // On ajoute l'ID de l'utilisateur à la requête
    next();
  } catch (err) {
    res.status(400).json({ message: "Token invalide" });
  }
};