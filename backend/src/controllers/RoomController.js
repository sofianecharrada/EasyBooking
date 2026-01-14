const Room = require("../models/Room");
const Booking = require("../models/Booking");

exports.getAllRooms = async (req, res) => {
  try {
    const { date, startTime, endTime, minCapacity } = req.query;
    let query = {};

    if (minCapacity && !isNaN(minCapacity)) {
      query.capacity = { $gte: Number(minCapacity) };
    }

    const rooms = await Room.find(query).lean();

    if (!date || !startTime || !endTime) {
      return res.json(rooms.map(r => ({ ...r, isAvailable: true })));
    }

    // On cherche les réservations qui chevauchent le créneau
    const bookings = await Booking.find({
      date: date,
      $and: [
        { startTime: { $lt: endTime } },
        { endTime: { $gt: startTime } }
      ]
    });

    console.log(`[getAllRooms] date=${date} start=${startTime} end=${endTime} bookings=${bookings.length}`);
    // log some bookings to help debugging (first 5)
    console.log(bookings.slice(0,5));

    const roomsWithStatus = rooms.map(room => {
      const isBooked = bookings.some(b => b.room.toString() === room._id.toString());
      return { ...room, isAvailable: !isBooked };
    });

    console.log('[getAllRooms] roomsWithStatus sample:', roomsWithStatus.slice(0,5));

    res.json(roomsWithStatus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Ajouter une nouvelle salle
// 2. Ajouter une nouvelle salle
exports.addRoom = async (req, res) => {
  try {
    // On ajoute 'amenities' à la déstructuration
    const { name, capacity, description, amenities } = req.body;
    
    const newRoom = new Room({ 
      name, 
      capacity, 
      description,
      amenities: amenities || [] // Sécurité : vide par défaut si non renseigné
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};