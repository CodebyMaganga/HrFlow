const User = require("../models/userModel");
const mongoose = require("mongoose");

//get all users
const getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).sort({ createdAt: -1 });

    res.status(201).json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single user
const getSingleUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleUser = await User.findById(id);

  if (!singleUser) {
    res.status(404).json({ message: "User cant be found" });
  }

  res.status(200).json({ singleUser });
};

//create user
const createUser = async (req, res) => {
  const fields = req.body;

  try {
    const newUser = await User.create(fields);
    res.status(201).json({ message: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create user, ${error.message}` });
  }
};

//update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.status(400).json({ message: "Invalid id" });
  }

  const updatedUser = await User.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(201).json({ message: `User updated successfully`, status:201 });
};

//delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (!deletedUser) {
    res.status(404).json({ message: "Cannot find user" });
  }
  res.status(201).json({ message: `User deleted successfully` });
};

// Add multiple users
const addMultipleUsers = async (req, res) => {
  const users = req.body; // Expect an array of user objects in the request body

  if (!Array.isArray(users)) {
    return res.status(400).json({ message: "Invalid data format, expected an array of users" });
  }

  try {
    // Insert multiple users using insertMany
    const newUsers = await User.insertMany(users,{ ordered: false });
    res.status(201).json({ message: `${newUsers.length} users created successfully`, users: newUsers });
  } catch (error) {
    res.status(400).json({ message: `Failed to create users: ${error.message}` });
  }
};


module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addMultipleUsers
};
