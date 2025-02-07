import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalCredits: { type: Number, default: 0 },
  totalSpents: { type: Number, default: 0 },
  posted: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "CarbonCredit",
  }],
  seen: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarbonCredit",
    },
  ],
  transactions: [
    {
      carbonCredit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CarbonCredit",
        required: true,
      },
      amount: { type: Number, required: true },
      purchaseDate: { type: Date, default: Date.now },
      quantity: { type: Number, required: true },
      sellerName: { type: String, required: true },
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
      },
    },
  ],
  isVerified: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

export default mongoose.model("User", userSchema);
