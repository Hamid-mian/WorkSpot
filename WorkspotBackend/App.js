const express = require("express");
const app = express();
const userRouter = require("./api/user/userRoute");
const homeRouter = require("./api/home/homeRoute");

require("dotenv").config();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/home", homeRouter);

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});