const express = require("express");
const router = express.Router();
const Company = require("../models/Company");
const auth = require("../middleware/auth");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const company = new Company({
      email,
      name,
    });
    await company.save();
    return res.json(company);
  } catch (error) {
    console.log(error.message);
  }
});

//get all company by name
router.get("/me", auth, async (req, res) => {
  try {
    const c = await User.findOne({ _id: req.user.id });
    if (!c) {
      return res.status(400).json({ msg: "Company not present" });
    }
    const company = await Company.findOne({ name: c.name });
    if (!company) {
      return res.status(400).json({ msg: "Company not present" });
    }
    return res.json(company);
  } catch (error) {
    console.log(error.message);
  }
});

//get all companies
router.get("/", async (req, res) => {
  try {
    const company = await Company.find({});
    return res.json(company);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
