const express = require("express");
const bodyParser = require("body-parser");
const miscRouter = express.Router();
miscRouter.use(bodyParser.urlencoded({ extended: true }));
miscRouter.use(bodyParser.json());

const { userLogin, ownerLogin } = require("../modules/login");

/**
 * test logging in a user or an owner
 *
 * @request
 *      isOwnerLogin
 *      Username
 *      Password
 *
 * @response
 *      200 if success
 *      various error codes if error
 *      UserID
 *      RestaurantID (if owner login mode)
 */
miscRouter.get("/login", userLogin, async (req, res) => {
    if (!isOwnerLogin) res.send(JSON.stringify({ status: 200, error: null, UserID: req.UserID }));
    let results, fields;
    // try to pull the userID and password from the database that matches username
    try {
        [results, fields] = await connection.execute(
            "SELECT * FROM " + db + ".Restaurants WHERE OwnerID = ?",
            [req.UserID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    if (results.length == 0) {
        console.log("user not found");
        res.send(JSON.stringify({ status: 401, error: "account not found for this restaurant" }));
        return;
    }
    res.send(
        JSON.stringify({
            status: 200,
            error: null,
            UserID: req.UserID,
            RestaurantID: results[0].RestaurantID,
        })
    );
});

module.exports = miscRouter;
