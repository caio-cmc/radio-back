const express = require('express');
const MusicsController = require('../Controllers/MusicsController');

const router = express.Router();

router.get('/', MusicsController.getAllSongs);
router.get('/:id', MusicsController.getSong);
router.post('/', MusicsController.createSong);

module.exports = router;