const express = require('express');
const AlbumsController = require('../Controllers/AlbumsController');

const router = express.Router();

router.get('/', AlbumsController.getAllAlbums);

module.exports = router;