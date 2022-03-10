import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import axios from "axios";
const Registracija = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [email, setEmail] = useState("");
  const [broj, setBroj] = useState("");
  const [show, setShow] = useState(2);

  const setChange = (e, setChange) => {
    setChange(e.target.value);
  };

  const registerUser = (e) => {
    if (username == "" || email == "") {
      setShow(0);
    } else {
      axios
        .post("http://localhost:3001/korisnik/registracija", {
          ime: ime,
          prezime: prezime,
          username: username,
          password: password,
          broj: broj,
          email: email,
        })
        .then((res) => {
          setShow(res.data[1]);

          console.log(res);
        })

        .catch((e) => console.log(e));
    }
    e.preventDefault();
  };

  const Upozorenje = () => {
    switch (show) {
      case 0:
        return (
          <>
            <div className="alert alert-danger" role="alert">
              Korisničko ime ili email je već u upotrebi
            </div>
          </>
        );
        break;

      case 1:
        setTimeout(function () {
          window.location.replace("/pocetna");
        }, 1000);
        return (
          <>
            <div className="alert alert-success" role="alert">
              Uspješno ste registrirani!
            </div>
          </>
        );
        break;
      default:
        return <></>;
        break;
    }
  };
  if (
    localStorage.getItem("username") === undefined ||
    localStorage.getItem("username")
  ) {
    window.location.replace("/pocetna");
    return;
  } else
    return (
      <>
        <Navbar />

        <section className="vh-100 ">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderradius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                      Registracija
                    </h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="username"
                              className="form-control form-control-lg"
                              maxLength={"15"}
                              required
                              value={username}
                              onChange={(e) => setChange(e, setUsername)}
                            />
                            <label className="form-label">Korisničko ime</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="password"
                              className="form-control form-control-lg"
                              maxLength={"20"}
                              required
                              value={password}
                              onChange={(e) => setChange(e, setPassword)}
                            />
                            <label className="form-label">Lozinka</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 d-flex align-items-center">
                          <div className="form-outline datepicker w-100">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              maxLength={"12"}
                              id="ime"
                              required
                              value={ime}
                              onChange={(e) => setChange(e, setIme)}
                            />
                            <label className="form-label">Ime</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 d-flex align-items-center">
                          <div className="form-outline  w-100">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="prezime"
                              required={"true"}
                              maxLength={"15"}
                              value={prezime}
                              onChange={(e) => setChange(e, setPrezime)}
                            />
                            <label className="form-label">Prezime</label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="email"
                              id="email"
                              className="form-control form-control-lg"
                              maxLength={"25"}
                              required
                              value={email}
                              onChange={(e) => setChange(e, setEmail)}
                            />
                            <label className="form-label">Email</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 pb-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="phoneNumber"
                              className="form-control form-control-lg"
                              maxLength={"15"}
                              required
                              value={broj}
                              onChange={(e) => setChange(e, setBroj)}
                            />
                            <label className="form-label">Broj mobitela</label>
                          </div>
                        </div>
                      </div>
                      <Upozorenje />
                      <div className="mt-2 ">
                        <input
                          className="btn btn-primary btn-lg"
                          type="submit"
                          value="Submit"
                          onClick={(e) => registerUser(e)}
                        />
                      </div>
                    </form>
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

export default Registracija;
