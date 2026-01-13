const mongoose = require('mongoose');
const BookingSchema = mongoose.Schema({
    room: {type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: String, required: true},
    timeslot: {type: String, required: true}
});
module.exports = mongoose.model('Booking', BookingSchema);