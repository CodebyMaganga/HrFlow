const Termination = require("../models/terminationModel");
const mongoose = require("mongoose");

//get all users
const getTermination = async (req, res) => {
  try {
    const allTerminations = await User.find({}).sort({ createdAt: -1 });

    res.status(201).json({ termination: allTerminations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single user
const getSingleTermination = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleTermination = await Termination.findById(id);

  if (!singleUser) {
    res.status(404).json({ message: "User cant be found" });
  }

  res.status(200).json({ singleUser });
};

//create user
const createUser = async (req, res) => {
  const { username, email, password, fullName } = req.body;

  try {
    const newUser = await User.create({ username, email, password, fullName });
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

  res.status(201).json({ message: `User updated successfully` });
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

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
