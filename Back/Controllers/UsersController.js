const UsersService = require('../Services/UsersService');

const getAllUsers = async (_req, res) => {
  const allUsers = await UsersService.getUsers();
  return res.status(200).json(allUsers);
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UsersService.getUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { User_name, User_email } = req.body;
    const newUser = await UsersService.newUsersVal(User_name, User_email);
    return res.status(201).json({
      new_user: {
        User_id: newUser.insertId,
        User_name,
        User_email
      }
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { User_name, User_email } = req.body;
    await UsersService.updateVal(User_name, User_email, id);
    return res.status(200).json({
      updated_user: {
        User_id: id,
        User_name,
        User_email
      }
    });
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UsersService.deleteVal(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
}

const getUserFavs = async (_req, res) => {
  const treatedFavs = await UsersService.treatUserFavs();
  return res.status(200).json(treatedFavs);
};

const getUserFavsById = async (req, res) => {
  try {
    const { id } = req.params;
    const treatedFavs = await UsersService.treatUserFavs(id);
    return res.status(200).json(treatedFavs);
  } catch (err) {
    return res.status(err.status).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserFavs,
  getUserFavsById
};