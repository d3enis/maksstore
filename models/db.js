//Importi
const mysql = require("mysql");
require("dotenv").config();

//Spajanje na bazu
const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBDATABASE,
});

/* db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Spojeno na MySql bazu.");
});
 */
module.exports = db;
