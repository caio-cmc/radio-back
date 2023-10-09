const connection = require('./connection');

const getAllAlbums = async () => {
  const [allAlbums] = await connection.execute('SELECT * FROM Album;');
  return allAlbums
};

module.exports = {
  getAllAlbums,
}