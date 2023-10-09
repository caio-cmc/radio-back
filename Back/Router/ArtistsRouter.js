const express = require('express');
const ArtistsController = require('../Controllers/ArtistsController');

const router = express.Router();

router.get('/', ArtistsController.getAllArtists);
router.get('/info', ArtistsController.getAllArtistsInfo);
router.get('/info/:id', ArtistsController.getArtistInfo);
router.get('/:id', ArtistsController.getArtist);

module.exports = router;