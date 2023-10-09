const ArtistsModel = require('../Models/ArtistsModel');

const getAllArtists = async () => {
  const allArtists = await ArtistsModel.getAllArtists();
  if (!allArtists) throw { status: 500, message: 'Internal server error' };

  return allArtists; 
}

const getArtistById = async (id) => {
  const allArtists = await getAllArtists();
  const artistExists = allArtists.some((a) => Number(a.Artist_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!artistExists) throw { status: 404, message: 'Artist not found' };

  const artist = await ArtistsModel.getArtistById(id);
  return artist; 
}

const treatArtistsInfo = async (id) => {
  let artInfo;
  if (id) {
    const allArtists = await getAllArtists();
    const artistExists = allArtists.some((a) => Number(a.Artist_id) === Number(id));
    if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
    if (!artistExists) throw { status: 404, message: 'Artist not found' };

    artInfo = await ArtistsModel.getArtistInfoById(id);
  } else {
    artInfo = await ArtistsModel.getAllArtistsInfo();
  }
  let treatedInfo = [];

  artInfo.forEach((art) => {
    const artExists = treatedInfo.some((i) => i.artist_id === art.id_artista);
    if (artExists) {
      const albExists = treatedInfo.some((i) => i.albums.some((a) => a.album_id === art.id_album));
      if (albExists) {
        treatedInfo.find((i) => {
          const albFound = i.albums.find((a) => a.album_id === art.id_album);
          albFound && albFound.musics.push({
            music_id: art.id_musica,
            music_name: art.titulo_da_musica
          });
        });
      } else {
        let found = treatedInfo.find((i) => i.artist_id === art.id_artista);
        found.albums.push({
          album_id: art.id_album,
          album_name: art.album,
          release_year: art.ano_de_estreia,
          genre: art.genero_musical,
          musics: [ { music_id: art.id_musica, music_name: art.titulo_da_musica } ]
        })
      }
    } else {
      treatedInfo.push({
        artist_id: art.id_artista,
        artist: art.artista,
        debut: art.estreia_do_artista,
        albums: [
          {
            album_id: art.id_album,
            album_name: art.album,
            release_year: art.ano_de_estreia,
            genre: art.genero_musical,
            musics: [ { music_id: art.id_musica, music_name: art.titulo_da_musica } ]
          }
        ]
      })
    }
  })

  return treatedInfo;
};

module.exports = {
  getAllArtists,
  getArtistById,
  treatArtistsInfo,
}