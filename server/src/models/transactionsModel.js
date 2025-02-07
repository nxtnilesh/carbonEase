import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  //   carbonCredit: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "CarbonCredit",
  //     required: true,
  //   },
  amount: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  quantity: { type: Number, required: true },
  sellerName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
