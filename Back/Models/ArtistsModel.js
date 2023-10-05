const connection = require('./connection');

const getAllArtistsInfo = async () => {
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
  return result;
}

module.exports = {
  getAllArtistsInfo,
}