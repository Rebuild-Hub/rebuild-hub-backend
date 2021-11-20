const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");
const auth = require("../middleware/auth");
const companies = require("../company");

//create new waste product
router.post("/", auth, async (req, res) => {
  try {
    const { name, category, weight, rate, company, image } = req.body;
    const waste = new Waste({
      name,
      category,
      weight,
      company,
      image,
      user: req.user.id,
      rate,
    });

    const targetCompany = companies.filter((c) => c.name == company);

    const wasteProduct = targetCompany[0].donations.find(
      (c) => c.category == category
    );
    wasteProduct.target -= weight;
    wasteProduct.fullfilled += weight;
    await waste.save();
    return res.json({ waste, targetCompany });
  } catch (error) {
    console.log(error.message);
  }
});

//get  All products for user
router.get("/me", auth, async (req, res) => {
  try {
    const wasteProducts = await Waste.find({ user: req.user.id });
    if (wasteProducts.length == 0) {
      return res.status(400).json({ msg: "No watse product present" });
    }
    return res.json({ wasteProducts });
  } catch (error) {
    console.log(error.message);
  }
});

//get All products for user categorywise
router.get("/category/:c", auth, async (req, res) => {
  try {
    const wasteProducts = await Waste.find({
      $and: [{ user: req.user.id }, { category: req.params.c }],
    });
    if (wasteProducts.length == 0) {
      return res.status(400).json({ msg: "No waste product present" });
    }
    return res.json({ wasteProducts });
  } catch (error) {
    console.log(error.message);
  }
});

//get all donation for a waste
router.get("/waste/:c", auth, async (req, res) => {
  try {
    const wasteDonations = await Waste.find({
      $and: [{ user: req.user.id }, { name: req.params.c }],
    });
    if (wasteDonations.length == 0) {
      return res.json({ wasteDonations, msg: "No donations found" });
    }
    return res.json({ wasteDonations, message });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;
