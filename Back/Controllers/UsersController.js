const UsersService = require('../Services/UsersService');

const getUserFavs = async (req, res) => {
  const treatedFavs = await UsersService.treatUserFavs();
  return res.status(200).json(treatedFavs);
};

module.exports = {
  getUserFavs,
}