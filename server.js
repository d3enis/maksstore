//Importi
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const proizvod = require("./routes/proizvod");
const kosarica = require("./routes/kosarica");
const korisnikRoute = require("./routes/korisnik");
const narudzba = require("./routes/narudzba");
const kategorije = require("./routes/kategorije");

//Middleware

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

//Routes
app.use("/korisnik", korisnikRoute);
app.use("/proizvod", proizvod);
app.use("/kosarica", kosarica);
app.use("/narudzba", narudzba);
app.use("/kategorije", kategorije);
app.get("/", (req, res) => {
  res.send("Desi brale");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server radi na portu:" + port);
});
