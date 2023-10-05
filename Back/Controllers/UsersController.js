const UsersService = require('../Services/UsersService');

const getAllUsers = async (req, res) => {
  const allUsers = await UsersService.getUsers();
  return res.status(200).json(allUsers);
}

const getUserFavs = async (req, res) => {
  const treatedFavs = await UsersService.treatUserFavs();
  return res.status(200).json(treatedFavs);
};

module.exports = {
  getAllUsers,
  getUserFavs,
}