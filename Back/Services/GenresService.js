const GenresModel = require('../Models/GenresModel');

const getGenres = async () => {
  const allGenres = await GenresModel.getAllGenres();
  if (!allGenres) throw { status: 500, message: 'Internal server error' };

  return allGenres;
};

const genreVal = async (id) => {
  const allGenres = await getGenres();
  const genreExists = allGenres.some((g) => Number(g.Genre_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!genreExists) throw { status: 404, message: 'Genre not found' };

  const genre = await GenresModel.getGenreById(id);
  return genre;
}

const newGenreVal = async (genre) => {
  const allGenres = await getGenres();
  const genreExists = allGenres.some((g) => g.Genre_name === genre);
  if (genreExists) throw { status: 400, message: 'Genre already exists' };
  if (!genre) throw { status: 400, message: 'Genre is required' };

  const newGenre = await GenresModel.createNewGenre(genre);
  return newGenre;
}

const updateGenreVal = async (genre, id) => {
  const allGenres = await getGenres();
  const otherGenres = allGenres.filter((g) => Number(g.Genre_id) !== Number(id));
  const genreExists = allGenres.some((g) => Number(g.Genre_id) === Number(id));
  const sameGenre = otherGenres.some((g) => g.Genre_name === genre);

  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!genreExists) throw { status: 404, message: 'Genre not found' };
  if (!genre || !id) throw { status: 400, message: 'Genre and id are required' };
  if (sameGenre) throw { status: 400, message: 'Genre already exists' };

  const updatedGenre = await GenresModel.updateGenre(genre, id);
  return updatedGenre;
}

const deleteGenreVal = async (id) => {
  const allGenres = await getGenres();
  const genreExists = allGenres.some((g) => Number(g.Genre_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!genreExists) throw { status: 404, message: 'Genre not found' };

  const deleted = await GenresModel.deleteGenre(id);
  return deleted;
}

module.exports = {
  getGenres,
  genreVal,
  newGenreVal,
  updateGenreVal,
  deleteGenreVal,
}