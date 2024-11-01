const Benefit = require("../models/benefitsModel");
const mongoose = require("mongoose");

//get all Benefit
const getBenefit = async (req, res) => {
  try {
    const allBenefits = await Benefit.find({}).sort({ createdAt: -1 });

    res.status(201).json({ benefits: allBenefits });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

//get a single Benefit
const getSingleBenefit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const singleBenefit = await Department.findById(id);

  if (!singleBenefit) {
    res.status(404).json({ message: "Benefits cant be found" });
  }

  res.status(200).json({ singleBenefit });
};

//create Benefit
const createBenefit = async (req, res) => {
  const { employee, benefitType,} = req.body;

  try {
    const newBenefit = await Benefit.create({ employee, benefitType,});
    res.status(201).json({ message: newBenefit });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to create Benefit, ${error.message}` });
  }
};

//update Benefit
const updateBenefit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.status(400).json({ message: "Invalid id" });
  }

  const updatedBenefit = await Benefit.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  res.status(201).json({ message: `Benefit updated successfully` });
};

//delete a Department
const deleteBenefit = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: "Invalid id" });
  }

  const deletedBenefit = await Benefit.findOneAndDelete({ _id: id });

  if (!deletedBenefit) {
    res.status(404).json({ message: "Cannot find Benefit" });
  }
  res.status(201).json({ message: `Benefit deleted successfully` });
};

module.exports = {
    getBenefit,
    getSingleBenefit,
    createBenefit,
    updateBenefit,
    deleteBenefit,
};
