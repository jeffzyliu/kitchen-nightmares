// imports
const express = require("express");
const bodyParser = require("body-parser");
const mealsRouter = express.Router();
mealsRouter.use(bodyParser.urlencoded({ extended: true }));
mealsRouter.use(bodyParser.json());

const { userLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");

// TODO consider making some stored procedures for these?

// TODO GET /meals/specific or something, need to create a new route for searching up a specific meal
// mealsRouter.get("/specific", function (req,res) {
// 	console.log("hi");
// 	connection.query(
// 		"SELECT TransactionID from Transactions \
// 		WHERE FoodID = (SELECT FoodID FROM Foods WHERE FoodName = ?) \
// 		AND TransactionDate = ?' AND TransactionCategory = ? \
// 		AND UserID = ?", 
// 		[req.body.FoodName, req.body.TransactionDate, req.body.TransactionCategory, req.UserID], function (error, results, fields) {
// 			if (error) throw error;
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 	})
// 	.catch( (err) => {
// 		res.send(JSON.stringify({"status": 205, "error": err}));
// 	});
// });
mealsRouter.get("/specific", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"SELECT TransactionID from Transactions \
			WHERE FoodID = (SELECT FoodID FROM Foods WHERE FoodName = ?) \
			AND TransactionDate = ?' AND TransactionCategory = ? \
			AND UserID = ?", 
			[req.body.FoodName, req.body.TransactionDate, req.body.TransactionCategory, req.UserID]
		);
	} catch (error) {
		res.send(JSON.stringify({"status": 205, "error": error}));
	}
	res.send(JSON.stringify({ status: 201, error: null, response: results }));
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
// mealsRouter.get("/", userLogin, function (req,res) {
// 	connection.query(
// 		"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
// 		FROM Users \
// 		JOIN Transactions ON Users.UserID = Transactions.UserID \
// 		JOIN Foods ON Transactions.FoodID = Foods.FoodID \
// 		JOIN Restaurants ON Foods.RestaurantID = Restaurants.RestaurantID \
// 		WHERE Users.UserID = ? \
// 		GROUP BY Date, MealCategory, RestaurantName \
// 		LIMIT 20", 
// 		[req.UserID], function (results, fields) {
// 			console.log(req.UserID);
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		})
// 		.catch( (err) => {
// 			res.send(JSON.stringify({"status": 205, "error": err}));
// 		});
// });

mealsRouter.get("/", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
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
// mealsRouter.get("/:date", userLogin, function (req,res) {
// 	console.log("hi");
// 	connection.query(
// 		"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
// 		FROM Users \
// 		JOIN Transactions ON Users.UserID = Transactions.UserID \
// 		JOIN Foods ON Transactions.FoodID = Foods.FoodID \
// 		JOIN Restaurants ON Foods.RestaurantID = Restaurants.RestaurantID \
// 		WHERE Users.UserID = ? AND Transactions.TransactionDate = ? \
// 		GROUP BY Date, MealCategory, RestaurantName \
// 		LIMIT 20", 
// 		[req.UserID, req.params.date], function (error, results, fields) {
// 			if (error) throw error;
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		})
// 		.catch( (err) => {
// 			res.send(JSON.stringify({"status": 205, "error": err}));
// 		});
// });

mealsRouter.get("/:date", userLogin, async (req,res) => {
	let results, fields;
	try {
		[
			results,
			fields,
		] = await connection.execute(
			"SELECT TransactionDate AS Date, TransactionCategory AS MealCategory, RestaurantName, SUM(FoodPrice) AS Cost \
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
// mealsRouter.post("/", userLogin, function (req,res) {
// 	console.log("hi");
// 	connection.query(
// 		"INSERT INTO Transactions (TransactionDate, TransactionCategory, UserID, FoodID) \
// 		VALUES (?, ?, ?, ?)", 
// 		[req.body.TransactionDate, req.body.TransactionCategory, req.UserID, req.body.FoodID], function (error, results, fields) {
// 			if (error) throw error;
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		})
// 		.catch( (err) => {
// 			res.send(JSON.stringify({"status": 205, "error": err}));
// 		});
// });

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
// mealsRouter.put("/:TransactionID", userLogin, function (req,res) {
// 	console.log("hi");
// 	connection.query(
// 		"UPDATE Transactions \
// 		SET FoodID = ? \
// 		WHERE TransactionID= ?", 
// 		[req.body.FoodID, req.params.TransactionID], function (error, results, fields) {
// 			if (error) throw error;
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		})
// 		.catch( (err) => {
// 			res.send(JSON.stringify({"status": 205, "error": err}));
// 		});
// });

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
// mealsRouter.delete("/:TransactionID", userLogin, function (req,res) {
// 	console.log("hi");
// 	connection.query(
// 		"DELETE FROM Transactions \
// 		WHERE TransactionID = ?", 
// 		[req.params.TransactionID], function (error, results, fields) {
// 			if (error) throw error;
// 			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
// 		})
// 		.catch( (err) => {
// 			res.send(JSON.stringify({"status": 205, "error": err}));
// 		});
// });

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
