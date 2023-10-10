const express = require('express');
const GenresController = require('../Controllers/GenresController');

const router = express.Router();

router.get('/', GenresController.getAllGenres);
router.get('/:id', GenresController.getGenreById);
router.post('/', GenresController.createGenre);
router.put('/:id', GenresController.updateGenre);
router.delete('/:id', GenresController.deleteGenre);

module.exports = router;