const AlbumsModel = require('../Models/AlbumsModel');

const getAllAlbums = async () => {
  const albums = await AlbumsModel.getAllAlbums();
  return albums;
};

module.exports = {
  getAllAlbums,
}