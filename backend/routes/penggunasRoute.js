const express = require("express");
const router = express.Router();
const Pengguna = require("../models/pengguna");

router.post("/register", async (req, res) => {
  const newpengguna = new Pengguna({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const pengguna = await newpengguna.save();
    res.send("Pengguna Register Sucesfuly");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pengguna = await Pengguna.findOne({ email: email, password: password });
    if (pengguna) {
      res.send(pengguna);
    } else {
      return res.status(400).json({ message: "login fail" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallpenggunas", async (req, res) => {
  try {
    const penggunas = await Pengguna.find();
    res.send(penggunas);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
