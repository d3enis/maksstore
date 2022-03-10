const express = require("express");
const router = express.Router();
const db = require("../models/db");

//Dodavanje proizvoda

router.post("/dodaj", (req, res) => {
  let naziv = req.body.naziv;
  let kategorija = req.body.kategorija;
  let cijena = req.body.cijena;
  let opis = req.body.opis;
  let slika = req.body.slika.myFile;
  const sqlInsert =
    "INSERT INTO proizvod (nazivProizvoda,kategorijaProizvoda,cijenaProizvoda,opisProizvoda,slikaProizvoda) VALUES (?,?,?,?,?) ";
  db.query(sqlInsert, [naziv, kategorija, cijena, opis, slika], (err, res) => {
    if (err) res.send(err);
    return;
  });
  res.sendStatus(201);
});

//Pretrazivanje svih proizvoda iz tablice
router.get("/query/:query", (req, res) => {
  let query = req.params.query.replace(
    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
    ""
  );

  let sqlUpit = "";
  if (query == "default") sqlUpit = `SELECT * FROM proizvod `;
  else
    sqlUpit = `SELECT * FROM proizvod WHERE nazivProizvoda like "%${query}%" or kategorijaProizvoda like "%${query}%"  `;

  db.query(sqlUpit, (err, results, fields) => {
    if (err) res.send(err.code);
    else res.send(results);
  });
});

//Dohvacanje jednog proizvoda po id-u
router.get("/:id", (req, res) => {
  let id = req.params.id;
  const sql = `SELECT * from proizvod  WHERE idProizvoda = ${id}`;
  db.query(sql, (err, results, fields) => {
    if (err) res.send(err.code);
    else res.status(200).send(results);
  });
});

module.exports = router;
