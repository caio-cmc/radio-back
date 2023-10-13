const connection = require('./connection');

const getAllUsers = async () => {
  const [allUsers] = await connection.execute('SELECT * FROM User;');
  return allUsers;
}

const getUserById = async (id) => {
  const [allUsers] = await connection.execute('SELECT * FROM User WHERE User_id = ?;', [id]);
  return allUsers;
}

const createNewUser = async (user, email) => {
  const [newUser] = await connection.execute('INSERT INTO User (User_name, User_email) VALUES (?, ?);', [user, email]);
  return newUser;
}

const updateUser = async (user, email, id) => {
  const [updatedUser] = await connection.execute('UPDATE User SET User_name = ?, User_email = ? WHERE User_id = ?;', [user, email, id]);
  return updatedUser;
}

const deleteUser = async (id) => {
  const [deletedUser] = await connection.execute('DELETE FROM User WHERE User_id = ?;', [id]);
  return deletedUser;
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
    LEFT JOIN User_album AS ua ON ua.User_id = us.User_id
    LEFT JOIN Album AS al ON al.Album_id = ua.Album_id
    LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id;`);
  return userFavs;
}

const getUserFavsById = async (id) => {
  const [userFavs] = await connection.execute(`
    SELECT
      us.User_id AS "id_usuario",
      us.User_name AS "nome_de_usuario",
      al.Album_name AS "album",
      ar.Artist_name AS "artista",
      ge.Genre_name AS "genero_musical",
      al.Album_release AS "ano_de_estreia"
    FROM User AS us
    LEFT JOIN User_album AS ua ON ua.User_id = us.User_id
    LEFT JOIN Album AS al ON al.Album_id = ua.Album_id
    LEFT JOIN Artist AS ar ON ar.Artist_id = al.Artist_id
    LEFT JOIN Genre AS ge ON ge.Genre_id = al.Genre_id
    WHERE us.User_id = ?;`, [id]);
  return userFavs;
}

const addFavAlbum = async (userId, albumId) => {
  const [newFav] = await connection.execute('INSERT INTO User_album (User_id, Album_id) VALUES (?, ?);', [userId, albumId]);
  return newFav;
}

const deleteFavAlbum = async (userId, albumId) => {
  const [deleteFav] = await connection.execute('DELETE FROM User_album WHERE User_id = ? AND Album_id = ?;', [userId, albumId]);
  return deleteFav;
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  getUserFavs,
  getUserFavsById,
  addFavAlbum,
  deleteFavAlbum
}