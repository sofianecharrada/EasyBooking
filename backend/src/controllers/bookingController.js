const Booking = require('../models/Booking');

// Créer une réservation avec détection de chevauchement
exports.createBooking = async (req, res) => {
  try {
    const { roomId, date, startTime, endTime } = req.body;
    
    // Vérification de l'ID utilisateur
    const userId = req.user ? req.user.id : null;

    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non identifié" });
    }

    // ... logique de conflit (déjà faite) ...

    const newBooking = new Booking({
      room: roomId,
      user: userId, // Ici, userId ne sera plus undefined
      date,
      startTime,
      endTime
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("[createBooking] error:", error);
    res.status(500).json({ error: error.message });
  }
};

// Consulter les réservations (Modifié pour utiliser req.user.id)
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('room');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Annuler une réservation (Reste identique mais vérifie la cohérence de req.user.id)
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id; 

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Réservation introuvable" });

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Action non autorisée" });
    }

    await Booking.findByIdAndDelete(bookingId);
    res.json({ message: "Réservation annulée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};