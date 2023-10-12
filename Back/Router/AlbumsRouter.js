const express = require('express');
const AlbumsController = require('../Controllers/AlbumsController');

const router = express.Router();

router.get('/', AlbumsController.getAllAlbums);
router.get('/info', AlbumsController.getAllAlbumsInfo);
router.get('/info/:id', AlbumsController.getAlbumInfoById);
router.get('/:id', AlbumsController.getAlbum);
router.post('/', AlbumsController.createAlbum);
router.put('/:id', AlbumsController.updateAlbum);
router.delete('/:id', AlbumsController.deleteAlbum);

module.exports = router;