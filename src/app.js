const express = require("express");
const cors = require("cors");
require("dotenv").config();

const userRouter = require("./routes/user");
const listFavsRouter = require("./routes/listFavs");
const favRouter = require("./routes/fav");

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());

//EndPoints
app.use("/auth/local/", userRouter);
app.use("/api", listFavsRouter);
app.use("/api", favRouter);

module.exports = app;
