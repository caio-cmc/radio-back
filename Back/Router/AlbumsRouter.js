const express = require('express');
const AlbumsController = require('../Controllers/AlbumsController');

const router = express.Router();

router.get('/', AlbumsController.getAllAlbums);
router.get('/:id', AlbumsController.getAlbum);
router.post('/', AlbumsController.createAlbum);

module.exports = router;