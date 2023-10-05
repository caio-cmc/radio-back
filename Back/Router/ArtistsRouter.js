const express = require('express');
const ArtistsController = require('../Controllers/ArtistsController');

const router = express.Router();

router.get('/', ArtistsController.getAllArtists);
router.get('/info', ArtistsController.getAllArtistsInfo);

module.exports = router;