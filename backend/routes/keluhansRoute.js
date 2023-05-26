const express = require("express");
const router = express.Router();

const Keluhan = require("../models/keluhan");

router.get("/getallkeluhans", async (req, res) => {
  try {
    const keluhans = await Keluhan.find({});
    res.send(keluhans);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/getkeluhanbyid", async (req, res) => {
  const keluhanid = req.body.keluhanid;
  try {
    const keluhan = await Keluhan.findOne({ _id: keluhanid });
    res.send(keluhan);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.post("/addkeluhan", async (req, res) => {
  try {
    const newkeluhan = new Keluhan(req.body);
    await newkeluhan.save();

    res.send("Berhasil Tambah Keluhan");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getkeluhansbyid/:id", async (req, res) => {
  try {
    const keluhan = await Keluhan.findById(req.params.id);
    res.json(keluhan);
  } catch (error) {
    res.status(404).json({ message: err });
  }
});

router.post("/terimakeluhan", async (req, res) => {
  const { keluhanid } = req.body;

  try {
    const statusterima = await Keluhan.findOne({ _id: keluhanid });

    statusterima.status = "Diproses";
    await statusterima.save();
    res.send("Okay");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/tolakkeluhan", async (req, res) => {
  const { keluhanid, alasanPenolakan } = req.body;

  try {
    const keluhan = await Keluhan.findOne({ _id: keluhanid });

    keluhan.status = "Ditolak";
    keluhan.alasanPenolakan = alasanPenolakan;
    await keluhan.save();

    res.send("Keluhan ditolak");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/selesaikeluhan", async (req, res) => {
  const { keluhanid } = req.body;

  try {
    const statusselesai = await Keluhan.findOne({ _id: keluhanid });

    statusselesai.status = "Selesai";
    await statusselesai.save();
    res.send("Okay");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.put("/:id/voteup", async (req, res) => {
  try {
    const keluhan = await Keluhan.findById(req.params.id);
    if (!keluhan) {
      return res.status(404).json({ message: "Keluhan tidak ditemukan" });
    }

    keluhan.vote += 1;
    await keluhan.save();

    return res.json({ message: "Vote berhasil ditingkatkan" });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
});

// router.put("/:id/votedown", async (req, res) => {
//   try {
//     const keluhan = await Keluhan.findById(req.params.id);
//     if (!keluhan) {
//       return res.status(404).json({ message: "Keluhan tidak ditemukan" });
//     }

//     keluhan.vote -= 1;
//     await keluhan.save();

//     return res.json({ message: "Vote berhasil diturunkan" });
//   } catch (error) {
//     return res.status(500).json({ message: "Terjadi kesalahan server" });
//   }
// });

module.exports = router;
