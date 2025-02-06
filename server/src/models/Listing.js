import mongoose from "mongoose";

const CarbonCreditSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // seller: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quantity: { type: Number, min: 1, required: true },
  pricePerCredit: { type: Number, min: 0, required: true },
  totalPrice: { type: Number, min: 0 }, // Will be auto-calculated
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
    index: true, // Speeds up queries on status
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Auto-calculate total price before saving
CarbonCreditSchema.pre("save", function (next) {
  this.totalPrice = this.quantity * this.pricePerCredit;
  next();
});

const CarbonCredit = mongoose.model("CarbonCredit", CarbonCreditSchema);
export default CarbonCredit;
