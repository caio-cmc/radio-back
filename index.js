const express = require('express');
const UsersRouter = require('./Back/Router/UserRouter');
const ArtistsRouter = require('./Back/Router/ArtistsRouter');
const AlbumsRouter = require('./Back/Router/AlbumsRouter');
const MusicsRouter = require('./Back/Router/MusicsRouter');
const GenresRouter = require('./Back/Router/GenresRouter');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/users', UsersRouter);
app.use('/artists', ArtistsRouter);
app.use('/albums', AlbumsRouter);
app.use('/musics', MusicsRouter);
app.use('/genres', GenresRouter);

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));