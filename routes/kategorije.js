const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.get("/:kategorija", (req, res) => {
  let kategorija = req.params.kategorija;
  let sqlUpit = `SELECT * FROM proizvod WHERE kategorijaProizvoda ="${kategorija}" `;
  db.query(sqlUpit, (err, results, fields) => {
    if (err) throw err;
    else res.send(results);
  });
});

module.exports = router;
