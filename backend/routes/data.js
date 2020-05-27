// imports
const express = require("express");
const bodyParser = require("body-parser");
const dataRouter = express.Router();
dataRouter.use(bodyParser.urlencoded({ extended: true }));
dataRouter.use(bodyParser.json());

const { userLogin, ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

/**
 * /GET /meals/data/0
 * visualize unique transaction count per restaurant on a map for a user
 *
 * @request
 *      Username
 *      Password
 *
 * @response
 *      array of [ { RestaurantName, MoneySpent } ... ]
 */
dataRouter.get("/meals/data/0", userLogin, async (req, res) => {
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT RestaurantName, SUM(TransactionPrice) AS MoneySpent \
            FROM Transactions NATURAL JOIN Foods NATURAL JOIN Restaurants \
            WHERE UserID = ? \
            GROUP BY RestaurantName",
            [req.UserID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

/**
 * /GET /meals/data/1
 * visualize unique transaction count per restaurant on a map for a user
 *
 * @request
 *      Username
 *      Password
 *
 * @response
 *      array of [ { RestaurantName, MealCount } ... ]
 */
dataRouter.get("/meals/data/1", userLogin, async (req, res) => {
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT RestaurantName, count(*) AS MealCount \
            FROM (SELECT DISTINCT TransactionCategory, TransactionDate, RestaurantName \
                FROM Transactions NATURAL JOIN Foods NATURAL JOIN Restaurants \
                WHERE UserID = ?) AS UniqueTable \
            GROUP BY RestaurantName",
            [req.UserID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

/**
 * GET /restaurants/data/0
 * visualize food items weighted by quantity purchased for a certain restaurant
 *
 * @request
 *      Username
 *      Password
 *      RestaurantID
 *
 * @response
 *      array of [ { FoodName, FoodCount } ... ]
 */
dataRouter.get("/restaurants/data/0", ownerLogin, async (req, res) => {
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT FoodName, count(*) as FoodCount \
            FROM (SELECT * \
                FROM Foods NATURAL JOIN Transactions \
                WHERE RestaurantID = ?) as FoodTransactions \
            GROUP BY FoodName",
            [req.RestaurantID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

/**
 * GET /restaurants/data/1
 * visualize food items weighted by total revenue per each food item for a restaurant
 *
 * @request
 *      Username
 *      Password
 *      RestaurantID
 *
 * @response
 *      array of [ { FoodName, FoodRevenue } ... ]
 */
dataRouter.get("/restaurants/data/1", ownerLogin, async (req, res) => {
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT FoodName, sum(TransactionPrice) as FoodRevenue \
             FROM (SELECT * \
                FROM Foods NATURAL JOIN Transactions \
                WHERE RestaurantID = ?) as FoodTransactions \
            GROUP BY FoodName",
            [req.RestaurantID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

module.exports = dataRouter;
