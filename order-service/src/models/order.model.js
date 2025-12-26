const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true, // snapshot of product name
    },
    price: {
      type: Number,
      required: true, // snapshot price at order time
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const AddressSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true, // public order reference
    },

    userId: {
      type: String,
      required: true,
      index: true,
    },

    items: {
      type: [OrderItemSchema],
      required: true,
    },

    shippingAddress: {
      type: AddressSchema,
      required: true,
    },

    payment: {
      method: {
        type: String,
        enum: ["COD", "CARD", "UPI", "NETBANKING"],
        required: true,
      },
      status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
        default: "PENDING",
      },
      transactionId: String,
    },

    amount: {
      subtotal: Number,
      tax: Number,
      shipping: Number,
      total: {
        type: Number,
        required: true,
      },
    },

    status: {
      type: String,
      enum: [
        "CREATED",
        "CONFIRMED",
        "PACKED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "CREATED",
      index: true,
    },

    cancellationReason: String,

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
