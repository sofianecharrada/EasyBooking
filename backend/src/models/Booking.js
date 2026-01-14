const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true }, // Format "HH:mm"
  endTime: { type: String, required: true }   // Format "HH:mm"
});
module.exports = mongoose.model('Booking', bookingSchema);

