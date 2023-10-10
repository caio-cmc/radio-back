const connection = require('./connection');

const getAllAlbums = async () => {
  const [allAlbums] = await connection.execute(`
    SELECT
      al.Album_id,
      al.Album_name,
      al.Album_release,
      ar.Artist_name,
      ge.Genre_name
    FROM Album AS al
    LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  return allAlbums
};

const getAlbumById = async (id) => {
  const [album] = await connection.execute(`
    SELECT
      al.Album_id,
      al.Album_name,
      al.Album_release,
      ar.Artist_name,
      ge.Genre_name
    FROM Album AS al
    LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
    WHERE al.Album_id = ?;`, [id]);
  return album
};

const createNewAlbum = async (album, release, artId, genId) => {
  const [newAlbum] = await connection.execute('INSERT INTO Album(Album_name, Album_release, Artist_id, Genre_id) VALUES(?, ?, ?, ?)', [album, release, artId, genId]);
  return newAlbum;
}

module.exports = {
  getAllAlbums,
  getAlbumById,
  createNewAlbum,
}