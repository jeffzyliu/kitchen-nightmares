const express = require("express");
const bodyParser = require("body-parser");
const restaurantsRouter = express.Router();
restaurantsRouter.use(bodyParser.urlencoded({ extended: true }));
restaurantsRouter.use(bodyParser.json());

const { ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

// TODO GET /restaurants/foods - get list of all foods and prices
/*
Send: {
	(header)
}
Response: {
	[ {FoodID, FoodName, FoodPrice}... ]
}
*/
restaurantsRouter.get("/foods", ownerLogin, async (req, res) => {
    let results, fields;
    // get some foods
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT FoodID, FoodName, FoodPrice FROM Foods WHERE RestaurantID = ? AND OnMenu",
            [req.RestaurantID]
        );
    } catch (error) {
        // something went wrong
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    res.send(
        JSON.stringify({
            status: 200,
            error: null,
            response: results,
        })
    );
});

/**
 * POST /foods
 * adds new foods to a restaurant's list
 *
 * @request
 *      Username (of a valid owner)
 *      Password
 *      RestaurantID
 *      FoodName
 *      FoodPrice
 *
 * @response
 *      201 success message if success  (response.insertId = new FoodID in schema)
 *      401 ish for various login errors
 *      500 for uncaught sever error
 */
restaurantsRouter.post("/foods", ownerLogin, async (req, res) => {
    let results, fields;
    // do an insert on foods
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "INSERT INTO Foods (FoodName, FoodPrice, RestaurantID, OnMenu) \
            VALUES (?, ?, ?, true)",
            [req.body.FoodName, req.body.FoodPrice, req.RestaurantID]
        );
    } catch (error) {
        // bad format
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "bad request format" }));
        return;
    }
    res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

// TODO PUT /restaurants/foods/:FoodID - update the price of a food
/*
Send: {
	(header), 
	NewPrice: number
}
Update Foods (FoodPrice) values (req.body.NewPrice) where FoodID = req.params.FoodID and RestaurantID = req.RestaurantID
Response: {
	Some happy go lucky success message
} 
*/

// TODO DELETE /restaurants/foods/:FoodID -- take food item off the menu (put disguised as a delete)
/*
send: {
	(header),
}
Update OnMenu to False in Foods where FoodID = req.paramsFoodID and RestaurantID = req.RestaurantID
Send back: {
	Some confirmation stuff
}
*/

module.exports = restaurantsRouter;
