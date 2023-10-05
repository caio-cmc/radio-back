const express = require('express');
const UsersController = require('./Back/Controllers/UsersController');
const ArtistsController = require('./Back/Controllers/ArtistsController');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/users/favorites', UsersController.getUserFavs);

app.get('/artists/info', ArtistsController.getAllArtistsInfo);

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));