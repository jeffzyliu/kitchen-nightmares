// imports
const express = require("express");
const bodyParser = require("body-parser");
const mealsRouter = express.Router();
mealsRouter.use(bodyParser.urlencoded({ extended: true }));
mealsRouter.use(bodyParser.json());

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

// TODO /GET /restaurants/data/0 - visualize food items weighted by quantity purchased for a restaurant
// TODO use ownerLogin
// TODO make stored procedure?
/* 
Send: {header}

select FoodName(or id), count (*) as FoodCount
from (select *
    from Foods
    where RestaurantID = req.RestaurantID)
group by FoodID

send back: {
    Response: [
        FoodName: string,
        FoodCount: number
    ]
}
 */

// TODO GET /restaurants/data/1 - visualize foods weighted by total $ spent on each for a restaurant
// TODO use ownerLogin
// TODO make stored procedure?
/*
Send: {header}

select foodName(or id), sum(FoodPrice) as TotalSum
from (select *
    from Foods
    where RestaurantID=restaurantID)
group by FoodID 

Send back: {
	Response: [
		FoodName: string,
		TotalSum: number 
	]
}
 */

module.exports = mealsRouter;
