const mongoose = require("mongoose");

const reqString = { type: String, required: true };

const JewelrySchema = new mongoose.Schema(
  {
    front: reqString,
    flash: reqString,
    title: reqString,
    cost: reqString,
    category: reqString,
  },
  {
    versionKey: false,
  }
);

const JewelryModel = mongoose.model("jewelrie", JewelrySchema);

module.exports = {
  JewelryModel,
};
