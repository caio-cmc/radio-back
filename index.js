const express = require('express');
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3001;

app.use(express.json());

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "teste",
  database: "MyRadio",
  port: "5555"
});

app.get('/users/favorites', async (req, res) => {
  const [userFavs] = await connection.execute(`
    SELECT
      us.User_id AS "id_usuario",
      us.User_name AS "nome_de_usuario",
      al.Album_name AS "album",
      ar.Artist_name AS "artista",
      ge.Genre_name AS "genero_musical",
      al.Album_release AS "ano_de_estreia"
    FROM User AS us
    JOIN User_album AS ua ON ua.User_id = us.User_id
    JOIN Album AS al ON al.Album_id = ua.Album_id
    JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  let result = [];
  userFavs.forEach((fav) => {
    const exists = result.some((i) => i.user_id === fav.id_usuario);
    if (exists) {
      let found = result.find((i) => i.user_id === fav.id_usuario);
      found.fav_albums.push({
        album: fav.album,
        artist: fav.artista,
        genre: fav.genero_musical,
        release: fav.ano_de_estreia
      })
    } else {
      result.push({
        user_id: fav.id_usuario,
        user: fav.nome_de_usuario,
        fav_albums: [
          {
            album: fav.album,
            artist: fav.artista,
            genre: fav.genero_musical,
            release: fav.ano_de_estreia
          }
        ]
      })
    }
  })

  return res.status(200).json(result);
});

app.get('/artists', async (req, res) => {
  const [artists] = await connection.execute(`
    SELECT
      ar.Artist_id AS "id_artista",
      ar.Artist_name AS "artista",
      ar.Artist_debut AS "estreia_do_artista",
      al.Album_id AS "id_album",
      al.Album_name AS "album",
      al.Album_release AS "ano_de_estreia",
      ge.Genre_name AS "genero_musical",
      mu.Music_id AS "id_musica",
      mu.Music_name AS "titulo_da_musica"
    FROM Album AS al
    JOIN Music AS mu ON mu.Album_id = al.Album_id
    JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  let result = [];
  artists.forEach((art) => {
    const artExists = result.some((i) => i.artist_id === art.id_artista);
    if (artExists) {
      const albExists = result.some((i) => i.albums.some((a) => a.album_id === art.id_album));
      if (albExists) {
        result.find((i) => {
          const albFound = i.albums.find((a) => a.album_id === art.id_album);
          albFound && albFound.musics.push({
            music_id: art.id_musica,
            music_name: art.titulo_da_musica
          });
        });
      } else {
        let found = result.find((i) => i.artist_id === art.id_artista);
        found.albums.push({
          album_id: art.id_album,
          album_name: art.album,
          release_year: art.ano_de_estreia,
          genre: art.genero_musical,
          musics: [ { music_id: art.id_musica, music_name: art.titulo_da_musica } ]
        })
      }
    } else {
      result.push({
        artist_id: art.id_artista,
        artist: art.artista,
        debut: art.estreia_do_artista,
        albums: [
          {
            album_id: art.id_album,
            album_name: art.album,
            release_year: art.ano_de_estreia,
            genre: art.genero_musical,
            musics: [ { music_id: art.id_musica, music_name: art.titulo_da_musica } ]
          }
        ]
      })
    }
  })

  return res.status(200).json(result);
});

app.listen(PORT, () => console.log(`Aplicação rodando na porta ${PORT}`));