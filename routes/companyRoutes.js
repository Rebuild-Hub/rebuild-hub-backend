const express = require("express");
const company = require("../company");
const router = express.Router();
const Company = require("../models/Company");

router.post("/", async (req, res) => {
 
  try {
    const { email, name } = req.body;
    const company = new Company({
      email,
      name,
    });
    await company.save();
    return res.json(company)
  } catch (error) {
    console.log(error.message);
  }
});

//get all company by name
router.get("/:name", async (req, res) => {
  try {
    const company = await Company.find({ name: req.params.name });
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
