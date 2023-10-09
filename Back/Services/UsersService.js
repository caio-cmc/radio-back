const UsersModel = require('../Models/UsersModel');

const getUsers = async () => {
  const allUsers = await UsersModel.getAllUsers();
  return allUsers;
}

const getUserById = async (id) => {
  const allUsers = await getUsers();
  const userExists = allUsers.some((u) => Number(u.User_id) === Number(id));
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!userExists) throw { status: 404, message: 'User not found' };
  
  const users = await UsersModel.getUserById(id);
  return users;
}

const newUsersVal = async (user, email) => {
  const allUsers = await getUsers();
  const sameUser = allUsers.some((u) => u.User_name === user);
  const sameEmail = allUsers.some((u) => u.User_email === email);

  if (!user || !email) throw { status: 400, message: 'User and email are required' };
  if (sameUser || sameEmail) throw { status: 400, message: 'User already registered' };

  const registered = await UsersModel.createNewUser(user, email);
  return registered;
}

const updateVal = async (user, email, id) => {
  const allUsers = await getUsers();
  const otherUsers = allUsers.filter((u) => Number(u.User_id) !== Number(id));
  const userExists = allUsers.some((u) => Number(u.User_id) === Number(id));
  const sameUser = otherUsers.some((u) => u.User_name === user);
  const sameEmail = otherUsers.some((u) => u.User_email === email);

  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!userExists) throw { status: 404, message: 'User not found' };
  if (!user || !email || !id) throw { status: 400, message: 'User, email and id are required' };
  if (sameUser || sameEmail) throw { status: 400, message: 'User info unavailable' };

  const updated = await UsersModel.updateUser(user, email, id);
  return updated;
}

const deleteVal = async (id) => {
  const allUsers = await getUsers();
  const userExists = allUsers.some((u) => Number(u.User_id) === Number(id));
  
  if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
  if (!userExists) throw { status: 404, message: 'User not found' };

  const deleted = await UsersModel.deleteUser(id);
  return deleted;
}

const treatUserFavs = async (id) => {
  let userFavs;
  if (id) {
    userFavs = await UsersModel.getUserFavsById(id);
    const allUsers = await getUsers();
    const userExists = allUsers.some((u) => Number(u.User_id) === Number(id));
    if (isNaN(id)) throw { status: 400, message: 'Id must be a number' };
    if (!userExists) throw { status: 404, message: 'User not found' };
  } else {
    userFavs = await UsersModel.getUserFavs();
  }
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
  getUserById,
  newUsersVal,
  updateVal,
  deleteVal,
  treatUserFavs,
}