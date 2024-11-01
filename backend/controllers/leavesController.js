const Leaves = require("../models/leavesModel");
const mongoose = require("mongoose");

//get all depts
const getLeaves = async (req, res) => {
  try {
    const allLeaves = await Leaves.find({}).sort({ createdAt: -1 });

    res.status(201).json({ leaves: allLeaves});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single dept
const getSingleLeave= async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleLeave= await Department.findById(id);

  if (!singleLeave) {
    res.status(404).json({ message: "Leave cant be found" });
  }

  res.status(200).json({ singleLeave });
};

//create Department
const createLeave = async (req, res) => {
  const fields = req.body;

  try {
    const newLeave = await Leaves.create(fields);
    res.status(201).json({ message: newLeave });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create Leave, ${error.message}` });
  }
};

//update Department
const updateLeaves = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.status(400).json({ message: "Invalid id" });
  }

  const updatedLeave = await Leaves.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(201).json({ message: `Leaves updated successfully` });
};

//delete a Departments
const deleteLeave = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const deletedLeave = await Leaves.findOneAndDelete({ _id: id });

  if (!deletedLeave) {
    res.status(404).json({ message: "Cannot find Leave" });
  }
  res.status(201).json({ message: `Leave deleted successfully` });
};

module.exports = {
  getLeaves,
  getSingleLeave,
  createLeave,
  updateLeaves,
  deleteLeave,
};
