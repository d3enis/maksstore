const express = require("express");
const router = express.Router();
const db = require("../models/db");

//Registracija korisnika (dodavanje u tablicu)
router.post("/registracija", (req, res) => {
  let idKorisnika;
  let username = req.body.username;
  let password = req.body.password;
  let ime = req.body.ime;
  let prezime = req.body.prezime;
  let email = req.body.email;
  let broj = req.body.broj;

  //Provjera da li korisnik ili email postoje

  const sqlInsert =
    "INSERT INTO korisnik (username,password,ime,prezime,email,brojMobitela,admin) VALUES (?,?,?,?,?,?,?) ";

  const sqlKosarica =
    "INSERT INTO kosarica (idKorisnika,ime,prezime,brojMobitela,email)  VALUES (?,?,?,?,?)";

  const sqlGetIdKorisnika = `SELECT idKorisnika FROM korisnik WHERE username = "${username}"`;

  const sqlSelect = `SELECT username,email from korisnik WHERE username="${username}" OR email="${email}"`;

  db.query(sqlSelect, (err, results, fields) => {
    if (err) res.send(err);
    if (results.length > 0) {
      res.send(["Korisnicko ime ili email je već u upotrebi", 0]);
      res.end();
    } else {
      db.query(
        sqlInsert,
        [username, password, ime, prezime, email, broj, 0],
        (err, res) => {
          if (err) console.log(err);
        }
      );
      db.query(sqlGetIdKorisnika, (err, res) => {
        idKorisnika = res[0].idKorisnika;
        db.query(
          sqlKosarica,
          [idKorisnika, ime, prezime, broj, email],
          (err, res) => {
            if (err) console.log(err);
          }
        );
      });
      res.send(["Uspješno ste registrirani", 1]);
      res.end();
    }
  });
});

//Prijava korisnika emailom ili korisnickim imenom
router.post("/prijava", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  const sql = `SELECT username,email,password from korisnik WHERE (username = "${username}" OR email = "${username}") AND password = "${password}" `;
  db.query(sql, (err, results, fields) => {
    if (err) res.send(err);
    if (results.length > 0) {
      const sqlUser = `SELECT * from korisnik WHERE (username = "${username}" or email="${username}")`;
      db.query(sqlUser, (err, results, fields) => {
        res.send(["Uspjesno prijavljen korisnik", 1, results]);
        res.end();
      });
    } else {
      res.send(["Krivo korisnicko ime ili lozinka", 0]);
      res.end();
    }
  });
});

//Dohvacanje korisnika po imenu
router.post("/getKorisnik", (req, res) => {
  let username = req.body.username;
  const sql = `SELECT * from korisnik  WHERE username = "${username}"`;
  db.query(sql, (err, results, fields) => {
    if (err) res.send(err);

    res.send(results);
  });
});

module.exports = router;
