/**
 * small module to encapsulate authentication
 */

// password setup
const bcrypt = require("bcrypt");
// env setup
const connection = require("./sqlconnection");

/**
 * Core authentication middleware for users
 *
 * ! stores the UserID in req.UserID
 *
 * @param {*} req standard req, needs a body w/ username and password
 * @param {*} res response if an error message should be sent
 * @param {*} next standard to pass on execution to next middleware
 */
const userLogin = async (req, res, next) => {
    // null checks
    if (req == null || req.body == null || req.body.Username == null || req.body.Password == null) {
        console.log("invalid login");
        res.send(JSON.stringify({ status: 401, error: "login invalid" }));
        return false;
    }
    let results, fields;
    // try to pull the userID and password from the database that matches username
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT UserID, HashedPassword FROM Users WHERE Username LIKE ?",
            [req.body.Username]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    // username did not exist
    if (results.length == 0) {
        console.log("user not found");
        res.send(JSON.stringify({ status: 401, error: "username not found" }));
        return;
    }
    // username did exist, compare hashed passwords
    if (!(await bcrypt.compare(req.body.Password, results[0].HashedPassword))) {
        // wrong pass
        console.log("wrong password, login fail");
        res.send(JSON.stringify({ status: 401, error: "incorrect password" }));
        return;
    }
    // correct pass
    console.log(req.body.Username + " login success");
    //! stores the UserID in req.UserID
    req.UserID = results[0].UserID;
    next();
};

/**
 * Core authentication middleware for restaurant owners
 *
 * ! stores the RestaurantID in req.RestaurantID
 *
 * @param {*} req standard req, needs a body w/ username, password, restaurantID
 * @param {*} res response if an error message should be sent
 * @param {*} next standard to pass on execution to next middleware
 */
const ownerLogin = async (req, res, next) => {
    // null checks
    if (
        req == null ||
        req.body == null ||
        req.body.Username == null ||
        req.body.Password == null ||
        req.body.RestaurantID == null
    ) {
        console.log("invalid login");
        res.send(JSON.stringify({ status: 401, error: "login invalid" }));
        return false;
    }
    console.log(req.body);
    let results, fields;
    // try to pull the userID and password from the database that matches username and restaurantID
    try {
        [
            results,
            fields,
        ] = await connection.execute(
            "SELECT UserID, HashedPassword FROM Users INNER JOIN Restaurants ON OwnerID = UserID \
                WHERE Username LIKE ? AND RestaurantID = ?",
            [req.body.Username, req.body.RestaurantID]
        );
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify({ status: 500, error: "internal server error" }));
        return;
    }
    // username did not exist
    if (results.length == 0) {
        console.log("user not found");
        res.send(JSON.stringify({ status: 401, error: "account not found for this restaurant" }));
        return;
    }
    // username did exist, compare hashed passwords
    if (!(await bcrypt.compare(req.body.Password, results[0].HashedPassword))) {
        // wrong pass
        console.log("wrong password, login fail");
        res.send(JSON.stringify({ status: 401, error: "incorrect password" }));
        return;
    }
    // correct pass
    console.log(req.body.Username + " login success");
    //! stores the RestaurantID in req.RestaurantID
    req.RestaurantID = req.body.RestaurantID;
    next();
};

module.exports = { userLogin, ownerLogin };
