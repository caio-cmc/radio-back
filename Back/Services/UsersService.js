const UsersModel = require('../Models/UsersModel');

const getUsers = async () => {
  const allUsers = await UsersModel.getAllUsers();
  return allUsers;
}

const treatUserFavs = async () => {
  const userFavs = await UsersModel.getUserFavs();
  let treatedFavs = [];

  userFavs.forEach((fav) => {
    const exists = treatedFavs.some((i) => i.user_id === fav.id_usuario);
    if (exists) {
      let found = treatedFavs.find((i) => i.user_id === fav.id_usuario);
      found.fav_albums.push({
        album: fav.album,
        artist: fav.artista,
        genre: fav.genero_musical,
        release: fav.ano_de_estreia
      })
    } else {
      treatedFavs.push({
        user_id: fav.id_usuario,
        user: fav.nome_de_usuario,
        fav_albums: [
          {
            album: fav.album,
            artist: fav.artista,
            genre: fav.genero_musical,
            release: fav.ano_de_estreia
          }
        ]
      })
    }
  })
  return treatedFavs;
}

module.exports = {
  getUsers,
  treatUserFavs,
}