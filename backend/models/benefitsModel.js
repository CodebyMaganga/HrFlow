const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const benefitsSchema = new Schema(
  {
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    benefitType: {
      type: String,
      enum: [
        "Health Insurance",
        "Retirement Plan",
        "Paid Time Off",
        "Education Assistance",
        "Gym Membership",
        "Other",
      ],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Expired", "Pending"],
      default: "Active",
    },
    description: {
      type: String,
      trim: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Benefits", benefitsSchema);
