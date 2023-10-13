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

const updateSongVal = async (song, artist, album, id) => {
  if (!song || !artist || !album || !id) throw { status: 400, message: 'Song, album, artist and id are required' };
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  const allArtists = await ArtistsService.getAllArtists();
  const allAlbums = await AlbumsService.getAllAlbums();
  const songExists = await getSongById(id);
  const [artistExists] = allArtists.filter((a) => a.Artist_name === artist);
  const [albumExists] = allAlbums.filter((a) => a.Album_name === album);
  if (!songExists) throw { status: 404, message: 'Music not found' };
  if (!artistExists) throw { status: 404, message: 'Artist not found' };
  if (!albumExists) throw { status: 404, message: 'Album not found' };

  const updated = await MusicsModel.updateSong(song, albumExists.Album_id, artistExists.Artist_id, id);
  return updated;
}

const deleteSongVal = async (id) => {
  const allSongs = await getAllSongs();
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  const songExists = allSongs.some((s) => Number(s.Id) === Number(id));
  if (!songExists) throw { status: 404, message: 'Music not found' };

  const deleted = MusicsModel.deleteSong(id);
  return deleted;
}

module.exports = {
  getAllSongs,
  getSongById,
  newSongVal,
  updateSongVal,
  deleteSongVal
}