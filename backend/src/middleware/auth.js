const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) return res.status(401).json({ message: "Accès refusé" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // C'est ici que tu définis comment l'ID est stocké
    req.user = { id: decoded.id }; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};