const mongoose = require("mongoose");

const keluhanSchema = mongoose.Schema(
  {
    namawarga: {
      type: String,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    judulpengaduan: {
      type: String,
      required: true,
    },
    isipengaduan: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      rqeuired: true,
      default: "Pending",
    },
    alasanPenolakan: {
      type: String,
    },
    vote: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const keluhanModel = mongoose.model("keluhans", keluhanSchema);

module.exports = keluhanModel;
