const express = require("express");
const routes = express.Router();
const userRoute = require("./user.route");
const admin = require("./admin.route");
const task = require("./task.route");

routes.use("/user", userRoute);
routes.use("/admin", admin)
routes.use("/task", task)

module.exports = routes;
