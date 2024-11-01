const Attendance = require("../models/attendanceModel");
const mongoose = require("mongoose");

//get all users
const getAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find({}).sort({ createdAt: -1 });

    res.status(201).json({ attendance: allAttendance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single Attendance
const getSingleAttendance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleAttendance = await Attendance.findById(id);

  if (!singleAttendance) {
    res.status(404).json({ message: "User cant be found" });
  }

  res.status(200).json({ singleAttendance });
};

//create user
const createAttendance = async (req, res) => {
  const { attendanceID,} = req.body;

  try {
    const newAttendance = await Attendance.create({ attendanceID });
    res.status(201).json({ message: newAttendance });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create attendance, ${error.message}` });
  }
};

//update user
const updateAttendance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.status(400).json({ message: "Invalid id" });
  }

  const updatedAttendance = await Attendance.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(201).json({ message: `Attendance updated successfully` });
};

//delete a user
const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const deletedAttendance = await Attendance.findOneAndDelete({ _id: id });

  if (!deletedAttendance) {
    res.status(404).json({ message: "Cannot find Attendance" });
  }
  res.status(201).json({ message: ` Attendance deleted successfully` });
};

module.exports = {
    getAttendance,
    getSingleAttendance,
    createAttendance,
    updateAttendance,
    deleteAttendance,
};
