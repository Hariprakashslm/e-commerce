const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },

    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["COD", "CARD", "UPI", "NETBANKING"],
      required: true,
    },

    status: {
      type: String,
      enum: ["INITIATED", "SUCCESS", "FAILED"],
      default: "INITIATED",
    },

    transactionId: { type: String },
    failureReason: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
