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

const updateAlbum = async (album, release, artId, genId, albId) => {
  const [updatedAlbum] = await connection.execute('UPDATE Album SET Album_name = ?, Album_release = ?, Artist_id = ?, Genre_id = ? WHERE Album_id = ?;', [album, release, artId, genId, albId]);
  return updatedAlbum;
}

const deleteAlbum = async (id) => {
  const [deletedAlbum] = await connection.execute('DELETE FROM Album WHERE Album_id = ?;', [id]);
  return deletedAlbum;
}

const getAllAlbumsInfo = async () => {
  const [albumsInfo] = await connection.execute(`
  SELECT
    al.Album_id,
    al.Album_name,
    al.Album_release,
    ar.Artist_name,
    ge.Genre_name,
    mu.Music_id,
    mu.Music_name
  FROM Album AS al
  LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
  LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
  LEFT JOIN Music AS mu ON mu.Album_id = al.Album_id;`);
  return albumsInfo;
}

const getAlbumInfoById = async (id) => {
  const [albumInfo] = await connection.execute(`
  SELECT
    al.Album_id,
    al.Album_name,
    al.Album_release,
    ar.Artist_name,
    ge.Genre_name,
    mu.Music_id,
    mu.Music_name
  FROM Album AS al
  LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
  LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
  LEFT JOIN Music AS mu ON mu.Album_id = al.Album_id
  WHERE al.Album_id = ?;`, [id]);
  return albumInfo;
}

module.exports = {
  getAllAlbums,
  getAlbumById,
  createNewAlbum,
  updateAlbum,
  deleteAlbum,
  getAllAlbumsInfo,
  getAlbumInfoById
}