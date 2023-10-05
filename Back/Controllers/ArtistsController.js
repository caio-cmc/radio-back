const ArtistsService = require('../Services/ArtistsService');

const getAllArtistsInfo = async (req, res) => {
  const treatedInfo = await ArtistsService.treatAllArtistsInfo();
  return res.status(200).json(treatedInfo);
};

module.exports = {
  getAllArtistsInfo,
}