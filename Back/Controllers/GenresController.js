const GenresService = require('../Services/GenresService');

const getAllGenres = async (req, res) => {
  const allGenres = await GenresService.getGenres()
  return res.status(200).json(allGenres);
};

module.exports = {
  getAllGenres,
}