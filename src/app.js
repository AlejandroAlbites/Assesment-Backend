const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//EndPoints
app.use("/auth/local/", userRouter);

module.exports = app;
