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
  },
  {
    timestamps: true,
  }
);

const keluhanModel = mongoose.model("keluhans", keluhanSchema);

module.exports = keluhanModel;
