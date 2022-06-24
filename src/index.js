
//corsError
const cors= require("cors")

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
require("./db/conn");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const jwtkey = process.env.jwtkey;
//console.log("db..", process.env.DATABASE);
const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/RegisterModel");
const Product = require("./models/productModel");
const Meeshoproduct = require("./models/meeshoProductModel");
const Meeshocart = require("./models/meeshocartModel");

const app = express();

//corsError
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const securePassword = async (password) => {
  const newpassword = await bcrypt.hash(password, 10);
  return newpassword;
};

app.get("/", (req, res) => {
  res.send("home");
});

app.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    const { name, email, password } = user;
    //const hashpass = await securePassword(password);

    //console.log(req.body);
    /* const hashuser = {
      name: name,
      email: email,
      password: hashpass,
    };*/

    const createduser = await user.save();
    jwt.sign({ createduser }, jwtkey, { expiresIn: "300" }, (err, token) => {
      res.status(201).json({ token });
    });

    res.status(201).send(createduser);
  } catch (e) {
    res.status(401).send(e);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("login", req.body);
    if (!email || !password) {
      return res.status(401).json({ message: "please fill all fields..." });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "invalid user...." });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return res.status(201).send({ message: "login successful" });
      } else {
        return res.status(401).send({ message: "invalid user...." });
      }
    });

    /*if (user.password === password) {
      return res.status(201).send("login successful....");
    }
    return res.status(401).json("invalid user....");*/
  } catch (e) {
    console.log(e);
  }
});
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdproduct = await product.save();

    res.status(201).send(createdproduct);
  } catch (e) {
    res.status(401).send(e);
  }
});
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/products/:id", async (req, res) => {
  const cart = await Product.findById(req.params.id);
  //user.countDocuments();

  console.log(cart);

  res.send(cart);
});

//....................................meesho products............

app.post("/meeshoproducts", async (req, res) => {
  try {
    const product = new Meeshoproduct(req.body);
    const createdproduct = await product.save();

    res.status(201).send(createdproduct);
  } catch (e) {
    res.status(401).send(e);
  }
});
app.get("/meeshoproducts", async (req, res) => {
  const products = await Meeshoproduct.find();
  res.send(products);
});

app.get("/meeshoproducts/:id", async (req, res) => {
  const cart = await Meeshoproduct.findById(req.params.id);
  //user.countDocuments();

  console.log(cart);

  res.send(cart);
});
//,..................meesho cart products.................
app.post("/meeshoproducts/cart", async (req, res) => {
  try {
    const product = new Meeshocart(req.body);
    const createdproduct = await product.save();

    res.status(201).send(createdproduct);
  } catch (e) {
    res.status(401).send(e);
  }
});
app.get("/meeshoproducts/cart", async (req, res) => {
  const products = await Meeshocart.find();
  res.send(products);
});
app.get("/meeshoproducts/cart/:id", async (req, res) => {
  const cart = await Meeshoproduct.findById(req.params.id);

  console.log(cart);

  res.send(cart);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
