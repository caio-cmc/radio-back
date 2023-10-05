const connection = require('./connection');

const getAllUsers = async () => {
  const [allUsers] = await connection.execute('SELECT * FROM User;');
  return allUsers;
}

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
  return userFavs;
}

module.exports = {
  getAllUsers,
  getUserFavs,
}