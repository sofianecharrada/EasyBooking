const express = require('express');
const router = express.Router();
const roomController = require('../controllers/RoomController'); 

router.get('/', roomController.getAllRooms);

// Vérifie si roomController.addRoom existe bien
router.post('/add', roomController.addRoom); 

module.exports = router;