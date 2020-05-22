const express = require("express");
const bodyParser = require("body-parser");
const restaurantsRouter = express.Router();
restaurantsRouter.use(bodyParser.urlencoded({ extended: true }));
restaurantsRouter.use(bodyParser.json());

// env setup
const env = require("../env");
const config = require("../config")[env];

const { userLogin, ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");
const db = config.database.database;

// TODO finalizing the logic w/ frontend

module.exports = restaurantsRouter;
