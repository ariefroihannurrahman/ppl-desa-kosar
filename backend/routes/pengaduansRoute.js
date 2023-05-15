const express = require("express");
const router = express.Router();
const Pengaduan = require("../models/pengaduan");
const Keluhan = require("../models/keluhan");

// Fungsi Book keluhan {bookkeluhan} Tampilanpengaduan
// router.post("/bookkeluhan", async (req, res) => {
//   const { keluhan, kategori , judulpengaduan, isipengaduan} = req.body;

//   try {
//     const newpengaduan = new Pengaduan({
//       namawarga: keluhan.name,
//       namawargaid: keluhan._id,
//       kategori,
//       judulpengaduan,
//       isipengaduan

//     });

//     const pengaduan = await newpengaduan.save();

//     const keluhantemp = await Keluhan.findOne({ _id: keluhan._id });

//     keluhantemp.pelanggan.push({
//       pengaduanid: pengaduan._id,
//       namawarga: namawarga,
//       kategori: kategori,
//       judulpengaduan: judulpengaduan,
//       isipengaduan: isipengaduan,
//       status: "Keluhan Diterima",
      
//     });

//     await keluhantemp.save();

//     res.send("Berhasil Mengirim Pengaduan");
//   } catch (error) {
//     return res.status(400).json({ error });
//   }
// });

router.post("/getpengaduansbypenggunaid", async (req, res) => {
  const penggunaid = req.body.penggunaid;

  try {
    const pengaduans = await Pengaduan.find({ penggunaid: penggunaid });
    res.send(pengaduans);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// Admin
router.post("/approvekeluhan", async (req, res) => {
  const { pengaduanid, keluhanid } = req.body;

  try {
    const pengaduanitem = await Pengaduan.findOne({ _id: pengaduanid });

    pengaduanitem.status = "Sudah Diterima";
    await pengaduanitem.save();

    const keluhan = await keluhan.findOne({ _id: keluhanid });

    // const pengaduans = keluhan.pelanggan;

    // const temp = pengaduans.filter(
    //   (pengaduan) => pengaduan.pengaduanid.toString() !== pengaduanid
    // );
    // keluhan.pelanggan = temp;

    // await keluhan.save();

    res.send("Okay");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallpengaduans", async (req, res) => {
  try {
    const pengaduans = await Pengaduan.find();
    res.send(pengaduans);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
