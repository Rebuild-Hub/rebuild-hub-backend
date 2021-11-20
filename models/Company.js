const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },

  Donations: [
    {
      Category: {
        type: String,
      },
      target: {
        type: Number,
      },
      Fullfilled: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("company", companySchema);
