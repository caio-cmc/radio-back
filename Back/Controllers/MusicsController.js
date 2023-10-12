const MusicsService = require('../Services/MusicsService');

const getAllSongs = async (_req, res) => {
  try {
    const allSongs = await MusicsService.getAllSongs();
    return res.status(200).json(allSongs);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const getSong = async (req, res) => {
  try {
    const { id } = req.params;
    const [song] = await MusicsService.getSongById(id);
    return res.status(200).json(song);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllSongs,
  getSong,
}