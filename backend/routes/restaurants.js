const express = require("express");
const bodyParser = require("body-parser");
const restaurantsRouter = express.Router();
restaurantsRouter.use(bodyParser.urlencoded({ extended: true }));
restaurantsRouter.use(bodyParser.json());

// env setup
const env = require("../env");
const config = require("../config")[env];

const { userLogin, ownerLogin } = require("../modules/login");
const connection = require("../modules/sqlconnection");
const db = config.database.database;

// TODO GET /restaurants/foods - get list of all foods and prices
/*
Send: {
	(header)
}
Response: {
	[ {FoodID, FoodName, FoodPrice}... ]
}
*/

// TODO POST /restaurants/foods - add new foods to a restaurant’s list
/*
Send: {
	(header),
	FoodName: string,
	FoodPrice: number
}
Insert into blah blah, use restaurantID in header
Send back: {
	Some confirmation stuff
}
*/

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
