const Booking = require('../models/Booking');

// Créer une réservation
exports.createBooking = async (req, res) => {
  try {
    const { roomId, date, timeslot } = req.body;

    // Vérification de disponibilité : même salle, même date, même créneau
    const conflict = await Booking.findOne({ room: roomId, date, timeslot });
    if (conflict) {
      return res.status(400).json({ message: "Ce créneau est déjà réservé pour cette salle." });
    }

    const newBooking = new Booking({
      room: roomId,
      user: req.userId, // Récupéré via le middleware JWT
      date,
      timeslot
    });

    await newBooking.save();
    res.status(201).json({ message: "Réservation confirmée", booking: newBooking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Consulter les réservations de l'utilisateur connecté
exports.getUserBookings = async (req, res) => {
  try {
    // .populate('room') permet de récupérer les détails de la salle (nom, etc.)
    const bookings = await Booking.find({ user: req.userId }).populate('room');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const userId = req.user.id; // Récupéré via ton middleware d'auth

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }

        // Vérification de sécurité : seul le propriétaire peut annuler
        if (booking.user.toString() !== userId) {
            return res.status(403).json({ message: "Action non autorisée" });
        }

        await Booking.findByIdAndDelete(bookingId);
        res.json({ message: "Réservation annulée avec succès" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};