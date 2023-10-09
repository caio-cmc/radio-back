const AlbumsService = require('../Services/AlbumsService');

const getAllAlbums = async (req, res) => {
  const allAlbums = await AlbumsService.getAllAlbums();
  return res.status(200).json(allAlbums);
};

module.exports = {
  getAllAlbums,
}