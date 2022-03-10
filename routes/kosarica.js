const express = require("express");
const router = express.Router();
const db = require("../models/db");

let idKosarica;
//Dodavanje proizvoda u kosaricu

router.post("/dodaj", (req, res) => {
  let idKorisnika = req.body.idKorisnika;
  let idProizvoda = req.body.idProizvoda;
  let kolicina = req.body.kolicina;
  const getIdKosarice = `SELECT idKosarica from kosarica WHERE idKorisnika ="${idKorisnika}"`;

  const sqlInsert =
    "INSERT INTO kosarica_proizvod (idKosarice,idProizvoda,kolicina) VALUES (?,?,?) ";

  db.query(getIdKosarice, (err, results) => {
    if (err) res.send(err);

    idKosarica = results[0].idKosarica;
    const sqlDupliProizvod = `SELECT idProizvoda from kosarica_proizvod WHERE idKosarice = "${idKosarica}" AND idProizvoda = "${idProizvoda}" `;
    db.query(sqlDupliProizvod, (err, result) => {
      if (result.length > 0) {
        res.send("Proizvod je već dodan u košaricu");
        res.end();
      } else {
        db.query(
          sqlInsert,
          [idKosarica, idProizvoda, kolicina],
          (err, result) => {
            if (err) console.log(err);
            res.send("Uspješno dodano u košaricu");
          }
        );
      }
    });
  });
});
//Dohvacanje proizvoda u kosarici
router.post("/all", (req, res) => {
  let idKorisnika = req.body.idKorisnika;

  let idKosarica;
  db.query(
    `SELECT idKosarica FROM kosarica where idKorisnika = "${idKorisnika}"`,
    (err, result) => {
      if (err) console.log(err);
      idKosarica = result[0].idKosarica;
      const sqlUpit = `SELECT *  FROM proizvod INNER JOIN kosarica_proizvod ON proizvod.idProizvoda = kosarica_proizvod.idProizvoda where kosarica_proizvod.idKosarice = "${idKosarica}";`;

      db.query(sqlUpit, (err, results, fields) => {
        if (err) res.send(err);

        res.send(results);
      });
    }
  );
});

//Brisanje iz kosarice
router.post("/izbrisi", (req, res) => {
  let idKorisnika = req.body.idKorisnika;
  let idProizvoda = req.body.idProizvoda;
  let idKosarica;
  db.query(
    `SELECT idKosarica FROM kosarica where idKorisnika = "${idKorisnika}"`,
    (err, result) => {
      if (err) console.log(err);
      idKosarica = result[0].idKosarica;
      const sqlBrisanje = `DELETE FROM kosarica_proizvod where idKosarice = "${idKosarica}" AND idProizvoda = "${idProizvoda}";`;

      db.query(sqlBrisanje, (err, results, fields) => {
        if (err) res.send(err);
        const sqlUpit = `SELECT * FROM proizvod INNER JOIN kosarica_proizvod ON proizvod.idProizvoda = kosarica_proizvod.idProizvoda where kosarica_proizvod.idKosarice = "${idKosarica}";`;

        db.query(sqlUpit, (err, results, fields) => {
          if (err) res.send(err);

          res.send(results);
        });
      });
    }
  );
});

//Mjenjanje kolicine proizvoda
router.put("/kolicina", (req, res) => {
  let idKorisnika = req.body.idKorisnika;
  let idProizvoda = req.body.idProizvoda;
  let kolicina = req.body.kolicina;
  let idKosarica;

  db.query(
    `SELECT idKosarica FROM kosarica where idKorisnika = "${idKorisnika}"`,
    (err, result) => {
      if (err) console.log(err);
      idKosarica = result[0].idKosarica;
      const sqlIzmjeni = `UPDATE webshop.kosarica_proizvod SET kolicina = "${kolicina}" where idKosarice = "${idKosarica}" AND idProizvoda = "${idProizvoda}"`;

      db.query(sqlIzmjeni, (err, results, fields) => {
        if (err) console.log(err);

        const sqlUpit = `SELECT *  FROM proizvod INNER JOIN kosarica_proizvod ON proizvod.idProizvoda = kosarica_proizvod.idProizvoda where kosarica_proizvod.idKosarice = "${idKosarica}";`;

        db.query(sqlUpit, (err, results, fields) => {
          if (err) console.log(err);

          res.send(results);
        });
      });
    }
  );
});

//Ukupna cijena proizvoda kosarice
router.post("/ukupno", (req, res) => {
  let idKorisnika = req.body.idKorisnika;

  let idKosarica;
  db.query(
    `SELECT idKosarica FROM kosarica where idKorisnika = "${idKorisnika}"`,
    (err, result) => {
      if (err) console.log(err);
      idKosarica = result[0].idKosarica;
      const sqlUpit = `SELECT cast(SUM(cijenaProizvoda*kolicina) as decimal(10,2)) AS ukupnaCijena FROM proizvod INNER JOIN kosarica_proizvod ON proizvod.idProizvoda = kosarica_proizvod.idProizvoda where kosarica_proizvod.idKosarice = "${idKosarica}";`;

      db.query(sqlUpit, (err, results, fields) => {
        if (err) res.send(err);

        res.send(results);
      });
    }
  );
});

module.exports = router;
