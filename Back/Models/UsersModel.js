const connection = require('./connection');

const getUserFavs = async () => {
  const [userFavs] = await connection.execute(`
    SELECT
      us.User_id AS "id_usuario",
      us.User_name AS "nome_de_usuario",
      al.Album_name AS "album",
      ar.Artist_name AS "artista",
      ge.Genre_name AS "genero_musical",
      al.Album_release AS "ano_de_estreia"
    FROM User AS us
    JOIN User_album AS ua ON ua.User_id = us.User_id
    JOIN Album AS al ON al.Album_id = ua.Album_id
    JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  let result = [];
  userFavs.forEach((fav) => {
    const exists = result.some((i) => i.user_id === fav.id_usuario);
    if (exists) {
      let found = result.find((i) => i.user_id === fav.id_usuario);
      found.fav_albums.push({
        album: fav.album,
        artist: fav.artista,
        genre: fav.genero_musical,
        release: fav.ano_de_estreia
      })
    } else {
      result.push({
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
  return result;
}

module.exports = {
  getUserFavs,
}