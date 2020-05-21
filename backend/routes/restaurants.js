const express = require("express");
const bodyParser = require("body-parser");
const restaurantsRouter = express.Router();
restaurantsRouter.use(bodyParser.urlencoded({ extended: true }));
restaurantsRouter.use(bodyParser.json());

module.exports = restaurantsRouter;
