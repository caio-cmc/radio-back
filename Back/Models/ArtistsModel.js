const connection = require('./connection');

const getAllArtists = async () => {
  const [artists] = await connection.execute('SELECT * FROM Artist;');
  return artists;
}

const getArtistById = async (id) => {
  const [artist] = await connection.execute('SELECT * FROM Artist WHERE Artist_id = ?;', [id]);
  return artist;
}

const createNewArtist = async (artist, debut) => {
  const [newArtist] = await connection.execute('INSERT INTO Artist (Artist_name, Artist_debut) VALUES (?, ?);', [artist, debut]);
  return newArtist;
}

const updateArtist = async (artist, debut, id) => {
  const [updatedArtist] = await connection.execute('UPDATE Artist SET Artist_name = ?, Artist_debut = ? WHERE Artist_id = ?;', [artist, debut, id]);
  return updatedArtist;
}

const deleteArtist = async (id) => {
  const [deletedArtist] = await connection.execute('DELETE FROM Artist WHERE Artist_id = ?;', [id]);
  return deletedArtist;
}

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
    FROM Artist AS ar
    LEFT JOIN Album AS al ON al.Artist_id = ar.Artist_id
    LEFT JOIN Music AS mu ON mu.Album_id = al.Album_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  
  return artistsInfo;
}

const getArtistInfoById = async (id) => {
  const [artistInfo] = await connection.execute(`
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
    FROM Artist AS ar
    LEFT JOIN Album AS al ON al.Artist_id = ar.Artist_id
    LEFT JOIN Music AS mu ON mu.Album_id = al.Album_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
    WHERE ar.Artist_id = ?;`, [id]);
  
  return artistInfo;
}

module.exports = {
  getAllArtists,
  getArtistById,
  createNewArtist,
  updateArtist,
  deleteArtist,
  getAllArtistsInfo,
  getArtistInfoById
}