const ArtistsService = require('../Services/ArtistsService');

const getAllArtists = async (req, res) => {
  const allArtists = await ArtistsService.getAllArtists();
  return res.status(200).json(allArtists);
}

const getAllArtistsInfo = async (req, res) => {
  const treatedInfo = await ArtistsService.treatAllArtistsInfo();
  return res.status(200).json(treatedInfo);
};

module.exports = {
  getAllArtists,
  getAllArtistsInfo,
}