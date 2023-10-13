const connection = require('./connection');

const getAllSongs = async () => {
  const [allSongs] = await connection.execute(`
    SELECT
      mu.Music_id AS "Id",
      mu.Music_name AS "Music",
      al.Album_release AS "Release",
      ar.Artist_name AS "Artist",
      al.Album_name AS "Album",
      ge.Genre_name AS "Genre"
    FROM Music AS mu 
    LEFT JOIN Artist AS ar ON ar.Artist_id = mu.Artist_id
    LEFT JOIN Album AS al ON al.Album_id = mu.Album_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  return allSongs
};

const getSongById = async (id) => {
  const [song] = await connection.execute(`
    SELECT
      mu.Music_id AS "Id",
      mu.Music_name AS "Music",
      al.Album_release AS "Release",
      ar.Artist_name AS "Artist",
      al.Album_name AS "Album",
      ge.Genre_name AS "Genre"
    FROM Music AS mu 
    LEFT JOIN Artist AS ar ON ar.Artist_id = mu.Artist_id
    LEFT JOIN Album AS al ON al.Album_id = mu.Album_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
    WHERE mu.Music_id = ?;`, [id]);
  return song
};

const createNewSong = async (song, albId, artId) => {
  const [newSong] = await connection.execute('INSERT INTO Music (Music_name, Album_id, Artist_id) VALUES (?, ?, ?);', [song, albId, artId]);
  return newSong;
}

const updateSong = async (song, albId, artId, id) => {
  const [updatedSong] = await connection.execute('UPDATE Music SET Music_name = ?, Album_id = ?, Artist_id = ? WHERE Music_id = ?;', [song, albId, artId, id]);
  return updatedSong;
}

const deleteSong = async (id) => {
  const [deletedSong] = await connection.execute('DELETE FROM Music WHERE Music_id = ?', [id]);
  return deletedSong;
}

module.exports = {
  getAllSongs,
  getSongById,
  createNewSong,
  updateSong,
  deleteSong
}