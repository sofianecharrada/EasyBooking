const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  amenities: [String], // Exemple: ['Projecteur', 'Wi-Fi', 'Tableau blanc']
  description: String
});
module.exports = mongoose.model('Room', RoomSchema);