import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../Footer/Footer";
import "./Proizvod.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const Proizvod = () => {
  let { id } = useParams();
  const [rezultat, setRezultat] = useState([""]);
  const [kolicina, setKolicina] = useState(1);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/proizvod/${id}`)
      .then((res) => setRezultat(res.data));
  }, [id]);

  let idProizvoda = rezultat[0].idProizvoda;
  let kategorija = rezultat[0].kategorijaProizvoda;
  let naziv = rezultat[0].nazivProizvoda;
  let slika = rezultat[0].slikaProizvoda;
  let cijena = rezultat[0].cijenaProizvoda;
  let opis = rezultat[0].opisProizvoda;

  const addToCart = (id) => {
    if (
      localStorage.getItem("username") === null &&
      localStorage.getItem("id") === null
    ) {
      alert("Prijavi se");
      window.location.replace("/prijava");
      return;
    }
    axios
      .post("http://localhost:3001/kosarica/dodaj", {
        idKorisnika: localStorage.getItem("idKorisnika"),
        idProizvoda: id,
        kolicina: kolicina,
      })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })

      .catch((e) => console.log(e));
  };

  return (
    <>
      <Navbar />

      <div className="proizvod m-5 ">
        <div className="row g-5">
          <div className="col-md-4">
            <img className="img-fluid" src={slika} alt="" />
          </div>
          <div className="col">
            <small>{kategorija}</small>

            <h1 className="display-5 text-secondary me-5">{naziv}</h1>

            <div className="d-flex">
              Dostupnost: <p style={{ color: "lime" }}> Na zalihi</p>
            </div>
            <hr style={{ width: "90%" }} />
            <div className="row d-flex ">
              <div className="opis col-md-5">{opis}</div>
              <div className="dodaj col-md-7 align-self-center">
                <div className="cijena my-3 underline px-md-5 ">
                  <h4>{cijena} kn</h4>
                </div>

                <div className="kosarica d-flex">
                  <input
                    className="rounded-pill col-2 mx-1 text-center border-dark"
                    type="number"
                    value={kolicina}
                    onChange={(e) => {
                      setKolicina(e.target.value);
                    }}
                  />
                  <button
                    className="btn rounded-pill"
                    onClick={() => addToCart(idProizvoda)}
                  >
                    <i className="fas fa-shopping-cart" /> Dodaj u košaricu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <Footer />
    </>
  );
};

export default Proizvod;
