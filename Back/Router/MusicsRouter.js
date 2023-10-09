const express = require('express');
const MusicsController = require('../Controllers/MusicsController');

const router = express.Router();

router.get('/', MusicsController.getAllSongs);

module.exports = router;