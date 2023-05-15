const mongoose = require("mongoose");

const pengaduanSchema = mongoose.Schema(
  {
    namawarga: {
      type: String,
      required: true,
    },
    namawargaid: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      rqeuired: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const pengaduanModel = mongoose.model("pengaduans", pengaduanSchema);

module.exports = pengaduanModel;
