const express = require("express");
const app = express();
const userRouter = require("./api/user/userRoute");
const homeRouter = require("./api/home/homeRoute");
const ProfileRouter = require("./api/Profile/profileRoute");
const DashboardRouter = require("./api/Dashboard/dashboardRoute");
const cors =require("cors");

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/home", homeRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/dashboard", DashboardRouter);
app.use(express.static("./upload"));
const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});