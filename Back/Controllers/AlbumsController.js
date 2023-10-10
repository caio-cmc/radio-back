const AlbumsService = require('../Services/AlbumsService');

const getAllAlbums = async (_req, res) => {
  try {
    const allAlbums = await AlbumsService.getAllAlbums();
    return res.status(200).json(allAlbums);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const getAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const album = await AlbumsService.getAlbumById(id);
    return res.status(200).json(album);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const createAlbum = async (req, res) => {
  try {
    const { Album_name, Album_release, Artist_name, Genre_name } = req.body;
    const newAlbum = await AlbumsService.newAlbumVal(Album_name, Album_release, Artist_name, Genre_name);
    return res.status(201).json({
      new_album: {
        Album_id: newAlbum.insertId,
        Album_name,
        Album_release,
        Artist_name,
        Genre_name
      }
    })
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const { Album_name, Album_release, Artist_name, Genre_name } = req.body;
    await AlbumsService.updateAlbumVal(Album_name, Album_release, Artist_name, Genre_name, id);
    return res.status(200).json({
      updated_album: {
        Album_id: id,
        Album_name,
        Album_release,
        Artist_name,
        Genre_name
      }
    })
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    await AlbumsService.deleteAlbumVal(id);
    return res.status(204).end()
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum
}