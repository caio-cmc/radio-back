const connection = require('./connection');

const getAllGenres = async () => {
  const [allGenres] = await connection.execute('SELECT * FROM Genre;');
  return allGenres;
}

module.exports = {
  getAllGenres,
}