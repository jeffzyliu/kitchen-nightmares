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

module.exports = mealsRouter;
