const connection = require('./connection');

const getAllArtistsInfo = async () => {
  const [artistsInfo] = await connection.execute(`
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
  
  return artistsInfo;
}

module.exports = {
  getAllArtistsInfo,
}