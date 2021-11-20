const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth")

router.get("/", auth , (req, res) => {
  res.send("User Routes");
});



//get all users
router.get("/" , async(req , res)=>{
  try {
    const users = await User.find({})
    return res.json(users)

  } catch (error) {
    console.log(error.message);
  }
})




module.exports = router;
