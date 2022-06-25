//Importi
const mysql = require("mysql");
require("dotenv").config();

//Spajanje na bazu
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

/* db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Spojeno na MySql bazu.");
});
 */
module.exports = db;
