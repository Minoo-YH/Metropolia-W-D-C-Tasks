const User = require("../models/userModel");

// GET all users
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// GET user by id
const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

// POST create user
const createUser = async (req, res) => {
  const user = await User.create({ ...req.body });
  res.status(201).json(user);
};

// DELETE user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
};
