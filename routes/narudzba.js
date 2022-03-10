const express = require("express");
const router = express.Router();
const db = require("../models/db");

router.post("/kreiraj", (req, res) => {
  let idNarudzbe;
  let idKorisnika = req.body.idKorisnika;
  let ukupnaCijena = req.body.ukupnaCijena;
  let ime = req.body.imePrimatelja;
  let prezime = req.body.prezimePrimatelja;
  let adresa = req.body.adresa;
  let postanskiBroj = req.body.postanskiBroj;
  let grad = req.body.grad;
  let drzava = req.body.drzava;
  let proizvodi = req.body.proizvodi;

  //Kreiraj narudzbu
  db.query(
    `INSERT INTO narudzba(idKorisnika,status,ukupnaCijena,imePrimatelja,prezimePrimatelja,adresa,grad,drzava) VALUES (?,?,?,?,?,?,?,?)`,
    [idKorisnika, "U obradi", ukupnaCijena, ime, prezime, adresa, grad, drzava],
    (err, result) => {
      if (err) console.log(err);
      //Dohvati id narudzbe
      db.query(`SELECT LAST_INSERT_ID() FROM narudzba`, (err, result) => {
        if (err) console.log(err);
        idNarudzbe = result[0]["LAST_INSERT_ID()"];
        //DODAVANJE PROIZVODA U TABLICU NARUDZBA_PROIZVOD
        proizvodi.forEach((proizvod) => {
          db.query(
            `INSERT INTO narudzba_proizvod(idNarudzbe,idProizvoda,kolicina) VALUES(?,?,?)`,
            [idNarudzbe, proizvod.idProizvoda, proizvod.kolicina],
            (err, result) => {
              if (err) console.log(err);
              db.query(
                `SELECT idKosarica FROM kosarica where idKorisnika = "${idKorisnika}"`,
                (err, result) => {
                  if (err) console.log(err);
                  let idKosarice = result[0].idKosarica;
                  db.query(
                    `DELETE FROM kosarica_proizvod where idKosarice = ${idKosarice}`,
                    (err, result) => {
                      if (err) console.log(err);
                    }
                  );
                }
              );
            }
          );
        });

        res.send("Uspješno");
      });
    }
  );
});

//Ispis narudzbi
router.post("/ispis", (req, res) => {
  let idKorisnika = req.body.idKorisnika;
  db.query(
    `SELECT narudzba.idNarudzbe,proizvod.nazivProizvoda,narudzba_proizvod.kolicina,(narudzba_proizvod.kolicina * proizvod.cijenaProizvoda) as cijenaProizvoda
FROM narudzba
INNER JOIN narudzba_proizvod on narudzba_proizvod.idNarudzbe = narudzba.idNarudzbe
LEFT JOIN proizvod on proizvod.idProizvoda = narudzba_proizvod.idProizvoda
where idKorisnika = ${idKorisnika}`,
    (err, result) => {
      if (err) console.log(err);
      console.log(result);
      res.send(result);
    }
  );
});
module.exports = router;
