const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  donations: [
    {
      categoryName: {
        type: String,
      },
      wastes: [
        {
          name: {
            type: String,
          },
          target: {
            type: Number,
          },
          fullfilled: {
            type: Number,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("company", companySchema);
