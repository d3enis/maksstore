import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";

const Kosarica = () => {
  const [proizvodi, setProizvodi] = useState([]);
  const [ukupno, setUkupno] = useState(0);
  const [user, setUser] = useState("");
  const [slanje, setSlanje] = useState({
    placanje: "Kartica",
    adresa: "",
    postanskiBroj: "",
    grad: "",
    drzava: "",
  });
  useEffect(() => {
    if (localStorage.getItem("idKorisnika") == null) {
      return;
    } else {
      axios
        .post("http://localhost:3001/kosarica/all", {
          idKorisnika: localStorage.getItem("idKorisnika"),
        })
        .then((res) => {
          setProizvodi(res.data);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3001/kosarica/ukupno", {
        idKorisnika: localStorage.getItem("idKorisnika"),
      })
      .then((res) => {
        proizvodi.length > 0
          ? setUkupno(res.data[0].ukupnaCijena)
          : setUkupno(0);
      });
  }, [proizvodi, ukupno]);

  useEffect(() => {
    axios
      .post("http://localhost:3001/korisnik/getKorisnik", {
        username: localStorage.getItem("username"),
      })
      .then((res) => {
        setUser(res.data[0]);
        console.log(res);
      })

      .catch((e) => console.log(e));
  }, []);

  const {
    idKorisnika: id = "",
    username: username = "",
    ime: ime = "",
    prezime: prezime = "",
    email: email = "",
    brojMobitela: broj = "",
    datumRegistracije: datum = "",
  } = user;

  const reducedProizvod = proizvodi.map((proizvod) => {
    return { idProizvoda: proizvod.idProizvoda, kolicina: proizvod.kolicina };
  });
  console.log(reducedProizvod);
  const { placanje, adresa, postanskiBroj, grad, drzava } = slanje;
  console.log(user);
  console.log(slanje);
  console.log(proizvodi);
  console.log(ukupno);
  const createOrder = () => {
    axios
      .post("http://localhost:3001/narudzba/kreiraj", {
        idKorisnika: localStorage.getItem("idKorisnika"),
        ukupnaCijena: ukupno,
        imePrimatelja: ime,
        prezimePrimatelja: prezime,
        adresa: adresa,
        postanskiBroj: postanskiBroj,
        grad: grad,
        drzava: drzava,
        proizvodi: reducedProizvod,
      })
      .then((res) => {
        alert(res.data);
        window.location.replace("/pocetna");
      });
  };

  const Proizvod = () => {
    if (proizvodi.length > 0) {
      return proizvodi.map((proizvod) => (
        <div key={proizvod.idProizvoda}>
          <div className="card-body">
            <div className="row d-flex justify-content-around align-items-center">
              <div className="col-6 ">
                <p className="fw-normal">{proizvod.nazivProizvoda}</p>
              </div>

              <div className="col-4">
                <h6>
                  {(proizvod.cijenaProizvoda * proizvod.kolicina)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " kn"}
                </h6>
              </div>
              <div className="col-2">{"x" + proizvod.kolicina}</div>
            </div>
          </div>
        </div>
      ));
    } else {
      return (
        <>
          <h1>Trenutno nemate ništa u košarici</h1>
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
                <h3 className="fw-normal mb-0 text-black">Vaša narudžba</h3>
              </div>

              <div className="card-body ">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Osobni podaci</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Ime primatelja:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ime}
                        onChange={(e) =>
                          setUser({ ...user, ime: `${e.target.value}` })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Prezime primatelja</label>
                      <input
                        type="text"
                        className="form-control"
                        value={prezime}
                        onChange={(e) =>
                          setUser({ ...user, prezime: `${e.target.value}` })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Broj mobitela</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={broj}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            brojMobitela: `${e.target.value}`,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group ">
                      <label>Način plačanja</label>
                      <select
                        className="form-select"
                        value={placanje}
                        onChange={(e) =>
                          setSlanje({
                            ...slanje,
                            placanje: `${e.target.value}`,
                          })
                        }
                      >
                        <option value="Kartica">Kartica</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Pouzeće">Pouzeće</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">
                      Adresa za dostavu
                    </h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Adresa</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite adresu za slanje"
                        value={adresa}
                        onChange={(e) =>
                          setSlanje({ ...slanje, adresa: `${e.target.value}` })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Grad</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite grad"
                        value={grad}
                        onChange={(e) =>
                          setSlanje({ ...slanje, grad: `${e.target.value}` })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Poštanski broj</label>
                      <input
                        type="text"
                        className="form-control"
                        value={postanskiBroj}
                        placeholder="Unesite postanski broj"
                        onChange={(e) =>
                          setSlanje({
                            ...slanje,
                            postanskiBroj: `${e.target.value}`,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Država</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Unesite drzavu"
                        value={drzava}
                        onChange={(e) =>
                          setSlanje({ ...slanje, drzava: `${e.target.value}` })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row d-flex">
                  <div className="col-6">
                    <h6>Naziv</h6>
                  </div>

                  <div className="col-4">
                    <h6>Cijena</h6>
                  </div>
                  <div className="col-2">
                    <h6>Kolicina</h6>
                  </div>
                </div>
                <hr />

                <Proizvod />
              </div>

              <div className="card">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <button
                    type="button"
                    className="btn btn-dark btn-block btn-lg"
                    onClick={() => createOrder()}
                  >
                    Potvrdi narudžbu
                  </button>
                  <div className="ukupno d-flex justify-content-end me-4">
                    <h5>
                      {"Ukupno:" +
                        " " +
                        ukupno
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                        "kn"}
                    </h5>
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
