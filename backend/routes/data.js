// imports
const express = require("express");
const bodyParser = require("body-parser");
const dataRouter = express.Router();
dataRouter.use(bodyParser.urlencoded({ extended: true }));
dataRouter.use(bodyParser.json());

const { userLogin, ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

// TODO GET /meals/data/0 - visualize cost per restaurant on a map for a user
// TODO use userLogin
// TODO make stored procedure?
/*
Send: {header}

select sum(cost) 
from all natural join 
where UserID = req.body.UserID 
group by RestaurantID(or name)

Send back: {
	Response: [
        RestaurantName,
        TotalSpent
    ]
}
*/

// TODO /GET /meals/data/1 - visualize unique transaction count per restaurant on a map for a user
// TODO use userLogin
// TODO make stored procedure?
/*
Send: {header}

select restaurantName (or id), count (*) 
from (select distinct transactionCategory, transactionDate, restaurantName
    from transactions 
    where userID = userID) 
group by restaurantName

Send back: {
	Response: [
        RestaurantName,
        MealCount
    ]
}
*/

/**
 * GET /restaurants/data/0
 * visualize food items weighted by quantity purchased for a certain restaurant
 *
 * @request
 *      Username
 *      Password
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
