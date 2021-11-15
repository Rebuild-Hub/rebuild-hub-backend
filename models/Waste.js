const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wasteSchema = new Schema({
  name: {
    type: string,
  },
  category: {
    type: string,
  },
  rate: {
    type: number,
  },
  weight: {
    type: number,
  },
  Company: {
    type: string,
  },
});

module.exports = mongoose.model("waste", wasteSchema);
