module.exports = (req, res, next) => {
  const { roomId, date, timeslot } = req.body;
  if (!roomId || !date || !timeslot) {
    return res.status(400).json({ message: "Données de réservation manquantes (Salle, Date ou Créneau)." });
  }
  next();
};