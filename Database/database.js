const mysql = require("mysql");

const con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "bdaef5d0ff2fef",
  password: "22eb99ff",
  database: "heroku_91e91659e6eab18",
  connectionLimit: 5,
});

exports.con = con;
exports.mysql = mysql;