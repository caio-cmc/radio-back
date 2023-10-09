const connection = require('./connection');

const getAllSongs = async () => {
  const [allSongs] = await connection.execute('SELECT * FROM Music;');
  return allSongs
};

module.exports = {
  getAllSongs,
}