const express = require('express');
const UsersController = require('../Controllers/UsersController');

const router = express.Router();

router.get('/', UsersController.getAllUsers);
router.get('/favorites', UsersController.getUserFavs);

module.exports = router;