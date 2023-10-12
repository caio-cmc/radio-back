const AlbumsModel = require('../Models/AlbumsModel');
const ArtistsService = require('./ArtistsService');
const GenresService = require('./GenresService');

const getAllAlbums = async () => {
  const albums = await AlbumsModel.getAllAlbums();
  if (!albums) throw { status: 500, message: 'Internal server error' };
  
  return albums;
};

const getAlbumById = async (id) => {
  const allAlbums = await getAllAlbums();
  const albumExists = allAlbums.some((a) => Number(a.Album_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!albumExists) throw { status: 404, message: 'Album not found' };

  const album = await AlbumsModel.getAlbumById(id);
  return album;
}

const newAlbumVal = async (album, release, artist, genre) => {
  const allArtists = await ArtistsService.getAllArtists();
  const allGenres = await GenresService.getGenres();
  const [artistExists] = allArtists.filter((a) => a.Artist_name === artist);
  const [genreExists] = allGenres.filter((g) => g.Genre_name === genre);
  let artId;
  let genId;
  if (!album || !release || !artist || !genre) throw { status: 400, message: 'Album, release year, artist and genre are required' };

  if (artistExists) {
    artId = artistExists.Artist_id;
  } else {
    const newArt = await ArtistsService.newArtistVal(artist, release);
    artId = newArt.insertId;
  }

  if (genreExists) {
    genId = genreExists.Genre_id;
  } else {
    const newGen = await GenresService.newGenreVal(genre);
    genId = newGen.insertId;
  }

  const [albumsFromArtist] = await ArtistsService.treatArtistsInfo(artId);
  const albumExists = albumsFromArtist.albums.some((a) => a.album_name === album);
  if (albumExists) throw { status: 400, message: 'Album already exists' };

  const newAlbum = await AlbumsModel.createNewAlbum(album, release, artId, genId);
  return [newAlbum, artId, genId];
}

const updateAlbumVal = async (album, release, artist, genre, id) => {
  if (!album || !release || !artist || !genre || !id) throw { status: 400, message: 'All fields are required' };
  const allAlbums = await getAllAlbums();
  const allArtists = await ArtistsService.getAllArtists();
  const allGenres = await GenresService.getGenres();
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  const albExists = allAlbums.some((a) => Number(a.Album_id) === Number(id));
  const [artExists] = allArtists.filter((a) => a.Artist_name === artist);
  const [genExists] = allGenres.filter((g) => g.Genre_name === genre);
  if (!albExists) throw { status: 404, message: 'Album not found' };
  if (!artExists) throw { status: 404, message: 'Artist not found' };
  if (!genExists) throw { status: 404, message: 'Genre not found' };

  const updated = await AlbumsModel.updateAlbum(album, release, artExists.Artist_id, genExists.Genre_id, id);
  return updated;
}

const deleteAlbumVal = async (id) => {
  const allAlbums = await getAllAlbums();  
  const albExists = allAlbums.some((a) => Number(a.Album_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!albExists) throw { status: 404, message: 'Album not found' };

  const deleted = await AlbumsModel.deleteAlbum(id);
  return deleted;
}

const treatAlbumsInfo = async (id) => {
  let albumInfo;
  if (id) {
    const allAlbums = await getAllAlbums();
    const albumExists = allAlbums.some((a) => Number(a.Album_id) === Number(id));
    if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
    if (!albumExists) throw { status: 404, message: 'Album not found' };
    
    albumInfo = await AlbumsModel.getAlbumInfoById(id);
  } else {
    albumInfo = await AlbumsModel.getAllAlbumsInfo();
  }
  let treatedAlbums = [];

  albumInfo.forEach((alb) => {
    const exists = treatedAlbums.some((a) => Number(a.Id) === Number(alb.Album_id));
    if (exists) {
      let found = treatedAlbums.find((a) => Number(a.Id) === Number(alb.Album_id));
      found.Musics.push({
        Music_id: alb.Music_id,
        Music: alb.Music_name
      })
    } else {
      treatedAlbums.push({
        Id: alb.Album_id,
        Album: alb.Album_name,
        Release: alb.Album_release,
        Artist: alb.Artist_name,
        Genre: alb.Genre_name,
        Musics: ( alb.Music_name === null ? [] : [
          {
            Music_id: alb.Music_id,
            Music: alb.Music_name
          }
        ])
      })
    }
  })
  return treatedAlbums;
}

module.exports = {
  getAllAlbums,
  getAlbumById,
  newAlbumVal,
  updateAlbumVal,
  deleteAlbumVal,
  treatAlbumsInfo
}