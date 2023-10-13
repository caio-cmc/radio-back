const express = require('express');
const UsersController = require('../Controllers/UsersController');

const router = express.Router();

router.get('/', UsersController.getAllUsers);
router.get('/favorites', UsersController.getUserFavs);
router.get('/favorites/:id', UsersController.getUserFavsById);
router.post('/favorites/:id', UsersController.addFavAlbum);
router.get('/:id', UsersController.getUser);
router.post('/', UsersController.createUser);
router.put('/:id', UsersController.updateUser);
router.delete('/:id', UsersController.deleteUser);

module.exports = router;