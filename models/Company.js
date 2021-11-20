const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isCompany: {
    type: Boolean,
  },
  donations: {},
});

module.exports = mongoose.model("company", companySchema);
