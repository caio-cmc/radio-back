const MusicsModel = require('../Models/MusicsModel');
// const AlbumsService = require('./AlbumsService');
// const ArtistsService = require('./ArtistsService');
// const GenresService = require('./GenresService');

const getAllSongs = async () => {
  const songs = await MusicsModel.getAllSongs();
  if (!songs) throw { status: 500, message: 'Internal server error' };

  return songs;
};

const getSongById = async (id) => {
  const allSongs = await getAllSongs();
  const songExists = allSongs.some((s) => Number(s.Id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!songExists) throw { status: 404, message: 'Song not found' };

  const song = await MusicsModel.getSongById(id);
  return song;
}

// const newSongVal = async (song, release, album, artist, genre) => {
//   if (!song || !release || !album || !artist || !genre) throw { status: 400, message: 'Song, album, release year, artist and genre are required' };
//   const allSongs = await getAllSongs();
//   const allAlbums = await AlbumsService.getAllAlbums();
//   const allArtists = await ArtistsService.getAllArtists();
//   const allGenres = await GenresService.getGenres();
//   const songExists = allSongs.some((s) => s.Music === song);
//   const [albumExists] = allAlbums.filter((a) => a.Album_name === album);
//   const [artistExists] = allArtists.filter((a) => a.Artist_name === artist);
//   const [genreExists] = allGenres.filter((g) => g.Genre_name === genre);
//   let albId;
//   let artId;
  
//   if ()
// }

module.exports = {
  getAllSongs,
  getSongById,
  // newSongVal
}