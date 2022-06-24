const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description1: {
    type: String,
  },
  description2: {
    type: String,
  },
  description3: {
    type: String,
  },
  description4: {
    type: String,
  },
  description5: {
    type: String,
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
});

const Product = new mongoose.model("Product", productSchema);
module.exports = Product;
