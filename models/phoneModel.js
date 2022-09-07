const mongoose = require("mongoose");

const PhoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phones: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Phone = mongoose.model("Phone", PhoneSchema);

module.exports = Phone;
