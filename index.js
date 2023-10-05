const express = require('express');
const UsersModel = require('./Back/Models/UsersModel');
const ArtistsModel = require('./Back/Models/ArtistsModel');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/users/favorites', async (req, res) => {
  const usersFav = await UsersModel.getUserFavs();
  return res.status(200).json(usersFav);
});

app.get('/artists', async (req, res) => {
  const artistsInfo = await ArtistsModel.getAllArtistsInfo();
  return res.status(200).json(artistsInfo);
});

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));