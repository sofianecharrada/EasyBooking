const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/bookingController');
const auth = require('../middleware/auth'); // Import du middleware de sécurité

// Créer une réservation : POST /api/bookings
// Le middleware 'auth' s'exécute AVANT le contrôleur
router.post('/', auth, bookingCtrl.createBooking);

// Voir ses réservations : GET /api/bookings/my-bookings
router.get('/my-bookings', auth, bookingCtrl.getUserBookings);

router.delete('/:id', auth, bookingCtrl.cancelBooking);

module.exports = router;