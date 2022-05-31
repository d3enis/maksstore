import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";

import axios from "axios";

const Prijava = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(2);
 
  const loginUser = (e) => {
    if (username == "" || password == "") {
      setShow(0);
    } else {
      axios
        .post("/korisnik/prijava", {
          username: username,
          password: password,
        })
        .then((res) => {
          setShow(res.data[1]);
          console.log(res);
          if (res.data[1] == 1) {
            localStorage.setItem("idKorisnika", res.data[2][0].idKorisnika);
            localStorage.setItem("username", res.data[2][0].username);
          }
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
              Krivo korisničko ime ili lozinka!
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
              Uspješno ste prijavljeni!
            </div>
          </>
        );
        break;
      default:
        return <></>;
        break;
    }
  };
  const setChange = (e, setChange) => {
    setChange(e.target.value);
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

        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row justify-content-center align-items-center h-100">
              <div className="col-12 col-lg-9 col-xl-7">
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderradius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5">
                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">
                      Prijava
                    </h3>
                    <form>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="username"
                              className="form-control form-control-lg"
                              maxLength={"25"}
                              required
                              onChange={(e) => setChange(e, setUsername)}
                              value={username}
                            />
                            <label className="form-label">Korisničko ime</label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="password"
                              required
                              className="form-control form-control-lg"
                              maxLength={"20"}
                              onChange={(e) => setChange(e, setPassword)}
                              value={password}
                            />
                            <label className="form-label">Lozinka</label>
                          </div>
                        </div>
                      </div>
                      <Upozorenje />
                      <div className="mt-2 ">
                        <input
                          className="btn btn-light btn-lg border-dark"
                          type="submit"
                          value="Prijava"
                          onClick={(e) => loginUser(e)}
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

export default Prijava;
