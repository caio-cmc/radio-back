const GenresModel = require('../Models/GenresModel');

const getGenres = async () => {
  const allGenres = await GenresModel.getAllGenres();
  return allGenres;
};

module.exports = {
  getGenres,
}