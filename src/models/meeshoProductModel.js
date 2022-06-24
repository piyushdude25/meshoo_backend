const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const meeshoproductSchema = mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  product_type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sub_category: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
  ratings: {
    type: String,
  },
  delivery: {
    type: String,
  },
  reviews: {
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

const Meeshoproduct = new mongoose.model("Meeshoproduct", meeshoproductSchema);
module.exports = Meeshoproduct;
