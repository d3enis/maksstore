import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const Kosarica = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [ukupno, setUkupno] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("idKorisnika") == null) {
      return;
    } else {
      axios
        .post("/kosarica/all", {
          idKorisnika: localStorage.getItem("idKorisnika"),
        })
        .then((res) => {
          setProizvodi(res.data);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .post("/kosarica/ukupno", {
        idKorisnika: localStorage.getItem("idKorisnika"),
      })
      .then((res) => {
        console.log(res.data);
        proizvodi.length > 0
          ? setUkupno(res.data[0].ukupnaCijena)
          : setUkupno(0);

        console.log(ukupno);
      });
  }, [proizvodi, ukupno]);

  const removeFromCart = (id) => {
    axios
      .post("/kosarica/izbrisi", {
        idKorisnika: localStorage.getItem("idKorisnika"),
        idProizvoda: id,
      })
      .then((res) => setProizvodi(res.data))
      .catch((err) => console.log(err));
  };

  const changeKolicina = (id, value) => {
    axios
      .put("/kosarica/kolicina", {
        idKorisnika: localStorage.getItem("idKorisnika"),
        idProizvoda: id,
        kolicina: value,
      })
      .then((res) => setProizvodi(res.data))

      .catch((err) => console.log(err));
  };

  const Proizvod = () => {
    if (proizvodi.length > 0) {
      return proizvodi.map((proizvod) => (
        <div key={proizvod.idProizvoda} className="card rounded-3 mb-4">
          <div className="card-body p-4">
            <div className="row d-flex justify-content-between align-items-center">
              <div className="col-md-2 col-lg-2 col-xl-2">
                <img
                  src={proizvod.slikaProizvoda}
                  className="img-fluid rounded-3"
                  alt="product"
                />
              </div>
              <div className="col-md-3 col-lg-3 col-xl-3">
                <a
                  className="text-black text-decoration-none"
                  href={"/proizvodi/" + proizvod.idProizvoda}
                >
                  <p className="lead fw-normal mb-2">
                    {proizvod.nazivProizvoda}
                  </p>
                </a>
              </div>
              <div className="col-3 col-md-3 col-lg-3 col-xl-2 d-flex">
                <input
                  id="form1"
                  min="1"
                  max="30"
                  defaultValue={proizvod.kolicina}
                  onKeyUp={(e) => {
                    if (e.key === "Enter" && e.target.value > 0)
                      changeKolicina(proizvod.idProizvoda, e.target.value);
                  }}
                  onMouseLeave={(e) => {
                    changeKolicina(proizvod.idProizvoda, e.target.value);
                  }}
                  type="number"
                  className="form-control form-control-sm"
                />
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 className="mb-0">
                  {(proizvod.cijenaProizvoda * proizvod.kolicina)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " kn"}
                </h5>
              </div>
              <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                <button
                  className="btn"
                  onClick={() => removeFromCart(proizvod.idProizvoda)}
                >
                  <i className="fas fa-trash fa-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <>
          <h3>Trenutno nemate ništa u košarici</h3>
        </>
      );
    }
  };

  return (
    <>
      <Navbar />

      <section className="h-100" style={{ backgroundcolor: " #eee" }}>
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0 text-black">Moja košarica</h3>
                <div></div>
              </div>

              <Proizvod />

              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-dark btn-block btn-lg"
                    onClick={() => {
                      window.location.replace("/narudzba");
                    }}
                  >
                    Nastavi do plaćanja
                  </button>

                  <div className="ukupno mx-5">
                    <h4>
                      Ukupno:
                      {ukupno.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      kn
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Kosarica;
