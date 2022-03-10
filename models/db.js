//Importi
const mysql = require("mysql");

//Spajanje na bazu
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "webshop",
});

db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Spojeno na MySql bazu.");
});

module.exports = db;
