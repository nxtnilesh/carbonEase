import mongoose from "mongoose";

const CarbonCreditSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, required: true, min: 1 },
  pricePerCredit: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  location: { type: String, required: true },
  projectType: {
    type: String,
    enum: [
      "Reforestation",
      "Renewable Energy",
      "Waste Management",
      "Agriculture",
      "Others",
    ],
    required: true,
  },
  verification: {
    verifiedBy: {
      type: String,
      enum: ["VCS", "Gold Standard", "CDM", "Others"],
      required: true,
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
