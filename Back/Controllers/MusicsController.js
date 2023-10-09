const MusicsService = require('../Services/MusicsService');

const getAllSongs = async (req, res) => {
  const allSongs = await MusicsService.getAllSongs();
  return res.status(200).json(allSongs);
};

module.exports = {
  getAllSongs,
}