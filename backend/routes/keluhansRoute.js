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

router.delete("/hapuskeluhan/:id", async (req, res) => {
  try {
    const hapuskeluhan = await Keluhan.deleteOne({ _id: req.params.id });
    res.send(hapuskeluhan);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// progres edit

router.get("/getkeluhansbyid/:id", async (req, res) => {
  try {
    const keluhan = await Keluhan.findById(req.params.id);
    res.json(keluhan);
  } catch (error) {
    res.status(404).json({ message: err });
  }
});

router.patch("/editkeluhan/:id", async (req, res) => {
  try {
    const edit = await Keluhan.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(edit);
  } catch (error) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;