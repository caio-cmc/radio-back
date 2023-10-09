const ArtistsService = require('../Services/ArtistsService');

const getAllArtists = async (_req, res) => {
  try {
    const allArtists = await ArtistsService.getAllArtists();
    return res.status(200).json(allArtists);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artist = await ArtistsService.getArtistById(id);
    return res.status(200).json(artist);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const getAllArtistsInfo = async (_req, res) => {
  try {
    const treatedInfo = await ArtistsService.treatArtistsInfo();
    return res.status(200).json(treatedInfo);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const getArtistInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const artistInfo = await ArtistsService.treatArtistsInfo(id);
    return res.status(200).json(artistInfo);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllArtists,
  getArtist,
  getAllArtistsInfo,
  getArtistInfo
}