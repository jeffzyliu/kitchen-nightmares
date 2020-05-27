const mysql = require("mysql2/promise");
// env setup
const env = require("../env");
const config = require("../config")[env];
// async MySQL db setup
global.pool = mysql.createPool(config.database);

module.exports = global.pool;
