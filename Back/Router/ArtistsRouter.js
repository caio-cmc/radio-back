const express = require('express');
const ArtistsController = require('../Controllers/ArtistsController');

const router = express.Router();

router.get('/', ArtistsController.getAllArtists);
router.get('/info', ArtistsController.getAllArtistsInfo);
router.get('/info/:id', ArtistsController.getArtistInfo);
router.get('/:id', ArtistsController.getArtist);
router.post('/', ArtistsController.createArtist);
router.put('/:id', ArtistsController.updateArtist);
router.delete('/:id', ArtistsController.deleteArtist);

module.exports = router;