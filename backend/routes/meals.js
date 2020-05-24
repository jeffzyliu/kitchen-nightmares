// imports
const express = require("express");
const bodyParser = require("body-parser");
const mealsRouter = express.Router();
mealsRouter.use(bodyParser.urlencoded({ extended: true }));
mealsRouter.use(bodyParser.json());

// env setup
const env = require("../env");
const config = require("../config")[env];

// const { userLogin, ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");
const db = config.database.database;

// TODO consider making some stored procedures for these?

// TODO GET /meals/specific or something, need to create a new route for searching up a specific meal
mealsRouter.get("/meals/specific", function (req,res) {
	console.log("hi");
	connection.query(
		"SELECT TransactionID from Transactions \
		WHERE FoodID = (SELECT FoodID FROM Foods WHERE FoodName = ?) \
		AND TransactionDate = ?' AND TransactionCategory = ? \
		AND UserID = ?", 
		[req.body.FoodName, req.body.TransactionDate, req.body.TransactionCategory, req.UserID], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});

// TODO GET /meals/ - last 20 meals
/*
Send to server: {header}

select date, category, restaurantname, sum(cost) 
from all tables natural joined
group by date, category, restaurantname
where UserID = req.UserID
limit 20

Send back to client: {
	Response: [
		Date: some date data type that we used
		MealCategory: string,
		RestaurantName: string,
		Cost: Number
    ]
}
*/
mealsRouter.get("/meals", function (req,res) {
	console.log("hi");
	connection.query(
		"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
		FROM Users \
		JOIN Transactions ON Users.UserID = Transactions.UserID \
		JOIN Foods ON Transactions.FoodID = Foods.FoodID \
		JOIN Restaurants ON Foods.RestaurantID = Resaurants.RestaurantID \
		WHERE Users.UserID = ? \
		GROUP BY Date, MealCategory, RestaurantName \
		LIMIT 20", 
		[req.UserID], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});
// TODO GET /meals/:date - all meals in a day (client will give option for current or enter in text boxes)
/*
Send to server: {date} {header}

select date, category, restaurantname, sum(cost) 
from all tables natural joined
where date = req.body.date
group by date, category, restaurantname
limit 20

Send back to client: {
	Response: [
		Date: some date data type that we used
		MealCategory: string,
		RestaurantName: string,
		Cost: Number
    ]
}
*/
mealsRouter.get("/meals/:date", function (req,res) {
	console.log("hi");
	connection.query(
		"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
		FROM Users \
		JOIN Transactions ON Users.UserID = Transactions.UserID \
		JOIN Foods ON Transactions.FoodID = Foods.FoodID \
		JOIN Restaurants ON Foods.RestaurantID = Resaurants.RestaurantID \
		WHERE Users.UserID = ? AND Transactions.TransactionDate = ? \
		GROUP BY Date, MealCategory, RestaurantName \
		LIMIT 20", 
		[req.UserID, req.params.date], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});

// TODO POST /meals - add a meal (foods dropdown from GET /foods, mealCategory from dropdown)
/*
Send to server: {
	{header},
	RestaurantName: string,
	TransactionDate: datetime whatever,
	FoodID: number,
	TransactionCategory: string
}

SQL query TBD (keep in mind that req.UserID contains the ID of the currently logged in user)

Send back: {
	Whatever error code stuff! Not much otherwise needed
}
*/
mealsRouter.post("/meals", function (req,res) {
	console.log("hi");
	connection.query(
		"INSERT INTO Transactions (TransactionDate, TransactionCategory, UserID, FoodID) \
		VALUES (?, ?, ?, ?)", 
		[req.body.TransactionDate, req.body.TransactionCategory, req.UserID, req.body.FoodID], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});

// TODO PUT /meals/:TransactionID to modify a meal
// (the user needs to use a GET to find the right TransactionID first before doing anything meaningful through PUT)
// (the client application will then call GET / foods /: restaurantName) to get the list of possible new foods)
/*
Send to server: {TransactionID} {
	(header),
	NewFoodID: number
}
(update transactions (foodID) values (newFoodID) where transactionID = req.params.TransactionID)
*/
mealsRouter.put("/meals/TransactionID", function (req,res) {
	console.log("hi");
	connection.query(
		"UPDATE Transactions \
		SET FoodID = ? \
		WHERE TransactionID= ?", 
		[req.body.FoodID, req.params.TransactionID], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});

// TODO DELETE /meals/:TransactionID  (the user needs to use a GET to find the right TransactionID first before doing anything meaningful through PUT)
/*
Send to server: {
    header,
    TransactionID
}
delete from transactions 
where TransactionID = req.params.TransactionID

send back some trivial things from a delete, check my other code for that
*/
mealsRouter.delete("/meals/TransactionID", function (req,res) {
	console.log("hi");
	connection.query(
		"DELETE FROM Transactions \
		WHERE TransactionID = ?", 
		[req.params.TransactionID], function (error, results, fields) {
			if (error) throw error;
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
		});
});

module.exports = mealsRouter;
