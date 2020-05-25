const express = require("express");
const bodyParser = require("body-parser");
const restaurantsRouter = express.Router();
restaurantsRouter.use(bodyParser.urlencoded({ extended: true }));
restaurantsRouter.use(bodyParser.json());

const { ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

/**
 * GET /restaurants/foods
 * gets a list of all foods and prices at this restaurant
 *
 * @request
 *      Username (of a valid owner)
 *      Password
 *      RestaurantID
 *
 * @response
 *      [ { FoodID, FoodName, FoodPrice }... ]
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
 * POST /restaurants/foods
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
 *      500 for uncaught server error
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

/**
 * PUT /restaurants/foods/:FoodID
 * update the price of a food
 *
 * @request params: FoodID
 *      body:
 *      Username (of a valid owner)
 *      Password
 *      RestaurantID
 *      NewPrice
 *
 * @response
 *      200 success message if success
 *      401 ish for various login errors
 *      500 for uncaught sever error
 */
restaurantsRouter.put("/foods/:FoodID", ownerLogin, async (req, res) => {
    console.log(req.params);
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "UPDATE Foods SET FoodPrice = ? WHERE FoodID = ? AND RestaurantID = ?",
            [req.body.NewPrice, req.params.FoodID, req.RestaurantID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "bad request format" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

/**
 * DELETE /restaurants/foods/:FoodID
 * -- take food item off the menu (update disguised as a delete)
 *
 * @request params: FoodID
 *      body:
 *      Username (of a valid owner)
 *
 * @response
 *      200 success message if success
 *      401 ish for various login errors
 *      500 for uncaught sever error
 */
restaurantsRouter.delete("/foods/:FoodID", ownerLogin, async (req, res) => {
    console.log(req.params);
    let results, fields;
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "UPDATE Foods SET OnMenu = false WHERE FoodID = ? AND RestaurantID = ?",
            [req.params.FoodID, req.RestaurantID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "bad request format" }));
        return;
    }
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
});

module.exports = restaurantsRouter;
