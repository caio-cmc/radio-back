const MusicsModel = require('../Models/MusicsModel');

const getAllSongs = async () => {
  const songs = await MusicsModel.getAllSongs();
  return songs;
};

module.exports = {
  getAllSongs,
}