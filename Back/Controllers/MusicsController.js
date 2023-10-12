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

const createSong = async (req, res) => {
  try {
    const { Music, Release, Album, Artist, Genre } = req.body;
    const newSong = await MusicsService.newSongVal(Music, Release, Album, Artist, Genre);
    return res.status(201).json({
      new_music: {
        Id: newSong.insertId,
        Music,
        Release,
        Artist,
        Album,
        Genre
      }
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllSongs,
  getSong,
  createSong
}