const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController'); // Vérifie le chemin !

// C'est ici que ça plante : si roomController.getAllRooms est undefined,
// Express lance l'erreur que tu as reçue.
router.get('/', roomController.getAllRooms);

// Vérifie si roomController.addRoom existe bien
router.post('/', roomController.addRoom); 

module.exports = router;