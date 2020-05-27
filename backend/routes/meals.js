// imports
const express = require("express");
const bodyParser = require("body-parser");
const mealsRouter = express.Router();
mealsRouter.use(bodyParser.urlencoded({ extended: true }));
mealsRouter.use(bodyParser.json());

const { userLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

/**
 * GET /meals
 * get info on all meals
 *
 * @request
 *
 * @response
 *      201 success message if success
 *      205 for error getting info from database
 * 		[ { Date, MealCategory, RestaurantName, Cost }... ]
 */

mealsRouter.get("/", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"SELECT DATE_FORMAT(TransactionDate, '%Y-%m-%d') AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
			FROM Users \
			JOIN Transactions ON Users.UserID = Transactions.UserID \
			JOIN Foods ON Transactions.FoodID = Foods.FoodID \
			JOIN Restaurants ON Foods.RestaurantID = Restaurants.RestaurantID \
			WHERE Users.UserID = ? \
			GROUP BY Date, MealCategory, RestaurantName \
			LIMIT 20", 
			[req.UserID]
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

/**
 * GET /meals/:date
 * get a specific meal's info
 *
 * @request params: date
 *
 * @response
 *      201 success message if success
 *      205 for error getting info from database
 * 		{ Date, MealCategory, RestaurantName, Cost }
 */

mealsRouter.get("/:date", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"SELECT DATE_FORMAT(TransactionDate, '%Y-%m-%d') AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
			FROM Users \
			JOIN Transactions ON Users.UserID = Transactions.UserID \
			JOIN Foods ON Transactions.FoodID = Foods.FoodID \
			JOIN Restaurants ON Foods.RestaurantID = Restaurants.RestaurantID \
			WHERE Users.UserID = ? AND Transactions.TransactionDate = ? \
			GROUP BY Date, MealCategory, RestaurantName \
			LIMIT 20", 
			[req.UserID, req.params.date]
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

/**
 * POST /meals
 * create a new meal
 *
 * @request
 *		body:
 *		TransactionDate
 *		TransactionCategory
 *		FoodID
 *
 * @response
 *      201 success message if success
 *      205 for error adding into database
 */

mealsRouter.post("/", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"INSERT INTO Transactions (TransactionDate, TransactionCategory, UserID, FoodID) \
			VALUES (?, ?, ?, ?)", 
			[req.body.TransactionDate, req.body.TransactionCategory, req.UserID, req.body.FoodID]
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

/**
 * PUT /meals/:TransactionID
 * updates a meal's food item
 *
 * @request params: TransactionID
 * 		body:
 * 		FoodID (new FoodID)
 *
 * @response
 *      201 success message if success
 *      205 for error updating from database
 */

mealsRouter.put("/:TransactionID", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"UPDATE Transactions \
			SET FoodID = ? \
			WHERE TransactionID= ?", 
			[req.body.FoodID, req.params.TransactionID],
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
});

/**
 * DELETE /meals/:TransactionID
 * Deletes a meal
 *
 * @request params: TransactionID
 *
 * @response
 *      201 success message if success
 *      205 for error deleting from database
 */

mealsRouter.delete("/:TransactionID", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"DELETE FROM Transactions \
			WHERE TransactionID = ?", 
			[req.params.TransactionID],
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
});
module.exports = mealsRouter;
