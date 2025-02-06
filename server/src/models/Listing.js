import mongoose from "mongoose";

const CarbonCreditSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quantity: { type: Number, min: 1 },
  pricePerCredit: { type: Number, min: 0 },
  totalPrice: { type: Number, min: 0 },
  location: { type: String },
  projectType: {
    type: String,
    enum: [
      "Reforestation",
      "Renewable Energy",
      "Waste Management",
      "Agriculture",
      "Others",
    ],
  },
  verification: {
    verifiedBy: {
      type: String,
      enum: ["VCS", "Gold Standard", "CDM", "Others"],
    },
    certificateUrl: { type: String, required: false },
  },
  status: {
    type: String,
    enum: ["Available", "Sold", "Pending"],
    default: "Available",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const CarbonCredit = mongoose.model("CarbonCredit", CarbonCreditSchema);
export default CarbonCredit; // ✅ Now it's an ES module export
