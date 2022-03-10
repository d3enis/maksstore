//Importi
const mysql = require("mysql");

//Spajanje na bazu
const db = mysql.createPool({
  connectionLimit: 15,
  host: "eu-cdbr-west-02.cleardb.net",
  user: "b60652ce281183",
  password: "2d792b40",
  database: "heroku_b3b23fbf54bb51c",
});

/* db.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Spojeno na MySql bazu.");
});
 */
module.exports = db;
