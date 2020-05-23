const express = require("express");
const bodyParser = require("body-parser");
const miscRouter = express.Router();
miscRouter.use(bodyParser.urlencoded({ extended: true }));
miscRouter.use(bodyParser.json());

// password setup
const bcrypt = require("bcrypt");
const saltRounds = 10;

const { userLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

/**
 * test logging in a user or an owner, also returns the ID info for the client to store
 *
 * @request
 *      isOwnerLogin
 *      Username
 *      Password
 *
 * @response
 *      200 if success
 *      various error codes if error
 *      UserID
 *      RestaurantID (if owner login mode)
 */
miscRouter.get("/login", userLogin, async (req, res) => {
    if (!req.body.isOwnerLogin) {
        res.send(JSON.stringify({ status: 200, error: null, UserID: req.UserID }));
        return;
    }
    let results, fields;
    // try to pull the userID and password from the database that matches username
    try {
        [results, fields] = await connection.execute(
            "SELECT * FROM Restaurants WHERE OwnerID = ?",
            [req.UserID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    if (results.length == 0) {
        console.log("user not found");
        res.send(JSON.stringify({ status: 401, error: "account not found for this restaurant" }));
        return;
    }
    res.send(
        JSON.stringify({
            status: 200,
            error: null,
            UserID: req.UserID,
            RestaurantID: results[0].RestaurantID,
        })
    );
});

/**
 * POST /user
 * creates a new student user with username/password and their name
 * initializes starting balance to 0
 *
 * @request
 *      Username
 *      Password
 *      FirstName
 *      MiddleInitial
 *      LastName
 *
 * @response
 *      201 success message if success (response.insertId = new userID in schema)
 *      1000 error if duplicate username
 *      500 for uncaught server error or there is bad format
 */
miscRouter.post("/register", async (req, res) => {
    console.log(req.body);
    let HashedPassword;
    try {
        // attempt to hash the password
        HashedPassword = await bcrypt.hash(req.body.Password, saltRounds);
    } catch (error) {
        console.log(error); // password not found
        res.send(JSON.stringify({ status: 500, error: "bad format" }));
        return;
    }
    let results, fields;
    try {
        // insert the new user
        [
            results,
            fields,
        ] = await connection.execute(
            "INSERT INTO Users (Username, HashedPassword, FirstName, MiddleInitial, LastName, TotalExpenditures) \
                VALUES (?, ?, ?, ?, ?, 0)",
            [
                req.body.Username,
                HashedPassword,
                req.body.FirstName,
                req.body.MiddleInitial,
                req.body.LastName,
            ]
        );
    } catch (error) {
        // duplicate username, bad request, or other errors
        if (error.errno == 1062) {
            console.log("duplicate username rejected");
            res.send(JSON.stringify({ status: 1000, error: "duplicate username" }));
        } else {
            console.log(error);
            res.send(JSON.stringify({ status: 500, error: "bad request format" }));
        }
        return;
    }
    // send a confirmation message back to client
    res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

/**
 * helper route for the client to query a list of foods offered on a
 * certain restaurant's menu
 *
 * @request params:
 *      RestaurantName
 * body:
 *      Username
 *      Password
 *
 * @response
 *      array of [FoodID, FoodName, FoodPrice]
 */
miscRouter.get("/foods/:RestaurantName", userLogin, async (req, res) => {
    console.log(req.params);
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT FoodID, FoodName, FoodPrice FROM Foods NATURAL JOIN \
                Restaurants WHERE RestaurantName LIKE ? AND OnMenu = TRUE",
            [req.params.RestaurantName]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

//TODO add GET /mealfoods/:date as last step
/* 
all foods in a day sorted by meal category(client will give option for current or enter in text boxes) (for inserts / deletes by ID)

Send to server: {date} {header}

select transactionID, date, category, restaurantname, foodName 
from all tables natural joined
limit 30

Send back to client: {
	Response: [
		Date: some date data type that we used
		TransactionID: number,
		MealCategory: string,
		RestaurantName: string,
		FoodName: string
    ]
}
 */

module.exports = miscRouter;
