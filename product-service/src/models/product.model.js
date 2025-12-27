const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: String,

    price: { type: Number, required: true },
    stock: { type: Number, required: true, min: 0 },

    category: { type: String, index: true },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
