const ArtistsModel = require('../Models/ArtistsModel');

const getAllArtists = async () => {
  const allArtists = await ArtistsModel.getAllArtists();
  return allArtists; 
}

const treatAllArtistsInfo = async () => {
  const allArtInfo = await ArtistsModel.getAllArtistsInfo();
  let treatedInfo = [];

  allArtInfo.forEach((art) => {
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
  treatAllArtistsInfo,
}