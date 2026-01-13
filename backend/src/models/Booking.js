const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  startTime: String, // ex: "09:00"
  endTime: String    // ex: "11:00"
});
module.exports = mongoose.model('Booking', bookingSchema);

