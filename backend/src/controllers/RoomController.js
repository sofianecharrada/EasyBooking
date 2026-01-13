const Room = require("../models/Room");
const Booking = require("../models/Booking");

exports.getAllRooms = async (req, res) => {
  try {
    const { date, timeslot, minCapacity } = req.query;
    
    // Initialisation sécurisée du filtre
    let query = {};

    // Correction : On ne filtre par capacité que si la valeur existe et est un nombre
    if (minCapacity && !isNaN(minCapacity)) {
      query.capacity = { $gte: Number(minCapacity) };
    }

    // Récupération des salles
    const rooms = await Room.find(query).lean();

    // Si pas de date ou timeslot, on renvoie tout pour éviter de planter la boucle map
    if (!date || !timeslot) {
      return res.json(rooms.map(r => ({ ...r, isAvailable: true })));
    }

    // Recherche des réservations existantes
    const bookings = await Booking.find({ date, timeslot });

    const roomsWithStatus = rooms.map((room) => {
      const isBooked = bookings.some(
        (b) => b.room.toString() === room._id.toString()
      );
      return {
        ...room,
        isAvailable: !isBooked,
      };
    });

    res.json(roomsWithStatus);
  } catch (error) {
    // TRÈS IMPORTANT : Regarde ton terminal Backend pour lire ce log !
    console.error("ERREUR SERVEUR :", error); 
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// 2. Ajouter une nouvelle salle
exports.addRoom = async (req, res) => {
  try {
    const { name, capacity, description } = req.body;
    const newRoom = new Room({ name, capacity, description });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
