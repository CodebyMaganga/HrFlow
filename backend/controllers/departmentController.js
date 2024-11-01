const Department = require("../models/departmentModel");
const mongoose = require("mongoose");

//get all depts
const getDepartment = async (req, res) => {
  try {
    const allDepartments = await Department.find({}).sort({ createdAt: -1 });

    res.status(201).json({ departments: allDepartments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single dept
const getSingleDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleDepartment = await Department.findById(id);

  if (!singleDepartment) {
    res.status(404).json({ message: "Department cant be found" });
  }

  res.status(200).json({ singleDepartment });
};

//create Department
const createDepartment = async (req, res) => {
  const { departmentID, name,} = req.body;

  try {
    const newDepartment = await Department.create({ departmentID, name });
    res.status(201).json({ message: newDepartment });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create Department, ${error.message}` });
  }
};

//update Department
const updateDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.status(400).json({ message: "Invalid id" });
  }

  const updatedDepartment = await Department.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(201).json({ message: `Department updated successfully` });
};

//delete a Department
const deleteDepartment = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const deletedDepartment = await Department.findOneAndDelete({ _id: id });

  if (!deletedDepartment) {
    res.status(404).json({ message: "Cannot find Department" });
  }
  res.status(201).json({ message: `Department deleted successfully` });
};

module.exports = {
  getDepartment,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
