/**************  BOILERPLATE AND IMPORTS *************/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// env setup
const env = require("./env");
const config = require("./config")[env];

/**************** REMAINING SETUP *******************/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log("/" + req.method);
    next();
});

// start server running on port 3000 (or whatever is set in env)
app.use(express.static(__dirname + "/"));
app.set("port", process.env.PORT || config.port || 3000);
app.listen(app.get("port"), () => {
    console.log("Server listening on port " + app.get("port"));
    console.log("Environment is " + env);
});

// blank GET to test connection
app.get("/", (req, res) => {
    res.send("server's up what's up :)))");
});

/**********************************************/
/**************** API LOGIC *******************/
/**********************************************/

const miscRouter = require("./routes/misc");
const mealsRouter = require("./routes/meals");
const restaurantsRouter = require("./routes/restaurants");

app.use("/", miscRouter);
app.use("/meals", mealsRouter);
app.use("/restaurants", restaurantsRouter);
