const connection = require('./connection');

const getAllGenres = async () => {
  const [allGenres] = await connection.execute('SELECT * FROM Genre;');
  return allGenres;
}

const getGenreById = async (id) => {
  const [genre] = await connection.execute('SELECT * FROM Genre WHERE Genre_id = ?;', [id]);
  return genre;
}

const createNewGenre = async (genre) => {
  const [newGenre] = await connection.execute('INSERT INTO Genre (Genre_name) VALUES (?);', [genre]);
  return newGenre;
}

const updateGenre = async (genre, id) => {
  const [updatedGenre] = await connection.execute('UPDATE Genre SET Genre_name = ? WHERE Genre_id = ?;', [genre, id]);
  return updatedGenre;
}

const deleteGenre = async (id) => {
  const [deletedGenre] = await connection.execute('DELETE FROM Genre WHERE Genre_id = ?;', [id]);
  return deletedGenre;
}

module.exports = {
  getAllGenres,
  getGenreById,
  createNewGenre,
  updateGenre,
  deleteGenre,
}