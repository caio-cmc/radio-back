const MusicsModel = require('../Models/MusicsModel');
const AlbumsService = require('./AlbumsService');
const ArtistsService = require('./ArtistsService');
const GenresService = require('./GenresService');

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

const newSongVal = async (song, release, album, artist, genre) => {
  if (!song || !release || !album || !artist || !genre) throw { status: 400, message: 'Song, album, release year, artist and genre are required' };
  const allArtists = await ArtistsService.getAllArtists();
  const allGenres = await GenresService.getGenres();
  const [artistExists] = allArtists.filter((a) => a.Artist_name === artist);
  const [genreExists] = allGenres.filter((g) => g.Genre_name === genre);
  let albId;
  let artId;
  
  if (artistExists) {
    artId = artistExists.Artist_id;
  } else {
    const newArt = await ArtistsService.newArtistVal(artist, release);
    artId = newArt.insertId;
  }

  if (!genreExists) await GenresService.newGenreVal(genre);

  const [albumsFromArtist] = await ArtistsService.treatArtistsInfo(artId);
  const [albumExists] = albumsFromArtist.albums.filter((a) => a.album_name === album);

  if (albumExists) {
    albId = albumExists.album_id;
  } else {
    const newAlb = await AlbumsService.newAlbumVal(album, release, artist, genre);
    albId = newAlb.insertId;
  }

  const[songsFromAlbum] = await AlbumsService.treatAlbumsInfo(albId);
  const songExists = songsFromAlbum.Musics.some((s) => s.Music === song);
  if (songExists) throw { status: 400, message: 'Music already exists' };

  const newSong = await MusicsModel.createNewSong(song, albId, artId);
  return newSong;
}

module.exports = {
  getAllSongs,
  getSongById,
  newSongVal
}