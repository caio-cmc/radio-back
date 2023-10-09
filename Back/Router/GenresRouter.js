const express = require('express');
const GenresController = require('../Controllers/GenresController');

const router = express.Router();

router.get('/', GenresController.getAllGenres);

module.exports = router;