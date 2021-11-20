const express = require("express");
const router = express.Router();
const Waste = require("../models/Waste");
const auth = require("../middleware/auth");
const Company = require("../models/Company");
const companies = require("../company");
//create new waste product
router.post("/", auth, async (req, res) => {
  try {
    const { name, category, weight, rate, company, image } = req.body;
    const waste = new Waste({
      name,
      category,
      weight,
      rate,
      company,
      image,
      user: req.user.id,
    });
    const targetCompany = await Company.findOne({ name: company });
    targetCompany.donations[category][name].fullfilled += weight;
    if (targetCompany.donations[category][name].target - weight <= 0) {
      targetCompany.donations[category][name].target -= 0;
    }

    await waste.save();
    await targetCompany.save();
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
      return res.status(400).json({ msg: "No watse product present" });
    }
    return res.json({ wasteProducts });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
