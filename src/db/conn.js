const mongoose = require("mongoose");

const DB = process.env.DATABASE;
mongoose
  .connect(process.env.DATABASE, {})
  .then(() => console.log("connection success..."))
  .catch((e) => {
    console.log(e);
  });
