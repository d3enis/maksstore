import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";
import "./Profile.css";
import { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState("");
  const [proizvodi, setProizvodi] = useState([]);

  useEffect(() => {
    axios
      .post("/korisnik/getKorisnik", {
        username: localStorage.getItem("username"),
      })
      .then((res) => {
        setUser(res.data[0]);
        console.log(res);
      })

      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("idKorisnika") == null) {
      return;
    } else {
      axios
        .post("http://localhost:3001/narudzba/ispis", {
          idKorisnika: localStorage.getItem("idKorisnika"),
        })
        .then((res) => {
          setProizvodi(res.data);
          console.log(res.data);
        });
    }
  }, []);

  const {
    idKorisnika: id = "",
    username = "",
    ime = "",
    prezime = "",
    email = "",
    brojMobitela: broj = "",
  } = user;

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
                  {proizvod.cijenaProizvoda
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
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body x">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Maxwell Admin"
                      />
                    </div>
                    <h5 className="user-name">{username}</h5>
                    <h6 className="user-email">{email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Osobni podaci</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Vaše ime i prezime:</label>
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        id="fullName"
                        value={ime + " " + prezime}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Email adresa</label>
                      <input
                        type="email"
                        readOnly
                        className="form-control"
                        id="eMail"
                        value={email}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Broj mobitela</label>
                      <input
                        type="text"
                        readOnly
                        className="form-control"
                        id="phone"
                        value={broj}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Identifikacijski broj računa</label>
                      <input
                        type="url"
                        readOnly
                        className="form-control"
                        id="website"
                        value={id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="narudzbe card-body container">
        <div className="row gutters">
          <h5 className="mb-2 text-primary text-center">Moje narudžbe</h5>
          <Proizvod />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
