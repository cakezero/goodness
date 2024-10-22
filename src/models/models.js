import mongoose from "mongoose";

const relationType = mongoose.Schema.Types.ObjectId;
const officerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    force: {
      type: String,
      enum: ["police", "vio"],
      default: "police",
    },
    rank: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const officer = mongoose.model("officers", officerSchema);

const plateNumberSchema = new mongoose.Schema(
  {
    plate_number: {
      type: String,
      required: true,
      unique: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    driverPhoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    driverAddress: {
      type: String,
      required: true,
      unique: true,
    },
    officer: {
      type: relationType,
      ref: "Officers",
    },
  },
  { timestamps: true }
);

const plateNumber = mongoose.model("plateNumbers", plateNumberSchema);

const penalitySchema = new mongoose.Schema({
  plate_number: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  officer: {
    type: relationType,
    ref: "Officer",
  },
});

const penality = mongoose.model("penalitys", penalitySchema);

export { officer, plateNumber, penality };
