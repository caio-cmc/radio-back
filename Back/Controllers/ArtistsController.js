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
    const [artist] = await ArtistsService.getArtistById(id);
    return res.status(200).json(artist);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const createArtist = async (req, res) => {
  try {
    const { Artist_name, Artist_debut } = req.body;
    const newArtist = await ArtistsService.newArtistVal(Artist_name, Artist_debut);
    return res.status(201).json({
      new_artist: {
        Artist_id: newArtist.insertId,
        Artist_name,
        Artist_debut
      } 
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const { Artist_name, Artist_debut } = req.body;
    await ArtistsService.updateArtistVal(Artist_name, Artist_debut, id);
    return res.status(200).json({
      updated_artist: {
        Artist_id: id,
        Artist_name,
        Artist_debut
      } 
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    await ArtistsService.deleteArtistVal(id);
    return res.status(204).end();
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
    const [artistInfo] = await ArtistsService.treatArtistsInfo(id);
    return res.status(200).json(artistInfo);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

module.exports = {
  getAllArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
  getAllArtistsInfo,
  getArtistInfo
}