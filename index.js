const express = require('express');
const UsersRouter = require('./Back/Router/UserRouter');
const ArtistsRouter = require('./Back/Router/ArtistsRouter');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/users', UsersRouter);
app.use('/artists', ArtistsRouter);

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));