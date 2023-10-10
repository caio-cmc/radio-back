const GenresService = require('../Services/GenresService');

const getAllGenres = async (_req, res) => {
  try {
    const allGenres = await GenresService.getGenres()
    return res.status(200).json(allGenres);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const getGenreById = async (req, res) => {
  try {
    const { id } = req.params;
    const genre = await GenresService.genreVal(id);
    return res.status(200).json(genre);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const createGenre = async (req, res) => {
  try {
    const { Genre_name } = req.body;
    const newGenre = await GenresService.newGenreVal(Genre_name);
    return res.status(201).json({
      new_genre: {
        Genre_id: newGenre.insertId,
        Genre_name
      }
    }) 
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { Genre_name } = req.body;
    await GenresService.updateGenreVal(Genre_name, id);
    return res.status(200).json({
      updated_genre: {
        Genre_id: id,
        Genre_name
      }
    }) 
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;
    await GenresService.deleteGenreVal(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
}