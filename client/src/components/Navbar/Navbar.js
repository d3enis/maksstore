import "./Navbar.css";

import Dropdown from "react-bootstrap/Dropdown";
const Navbars = ({ query, setQuery }) => {
  const CheckLogin = () => {
    if (localStorage.getItem("username") == null) {
      return (
        <div className="prijavareg  d-flex ">
          <a className="nav-link text-white" href="/prijava">
            Prijava
          </a>
          <a className="nav-link text-white" href="/registracija">
            Registracija
          </a>
        </div>
      );
    } else {
      return (
        <div className="prijavareg d-flex align-items-center ">
          <a className="nav-link text-white" href="/kosarica">
            <i className="fas fa-shopping-cart"></i>
          </a>

          <a className="nav-link text-white" href="/profil">
            {localStorage.getItem("username")}
            <i className="fa fa-user-circle-o avatar ps-2"></i>
          </a>
          <a
            className="nav-link text-white avatar pt-1 px-1"
            onClick={() => localStorage.clear()}
            href="/pocetna"
          >
            <i className="bi bi-x"></i>
          </a>
        </div>
      );
    }
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container justify-content-lg-between p-2">
          <div className="naslov d-flex align-items-end">
            <a className="navbar-brand  " href="/">
              MaksStore
            </a>
            <div className="d-lg-none drop ">
              <Dropdown>
                <Dropdown.Toggle variant="dark">
                  <i className="fas fa-bars" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/pocetna">Početna</Dropdown.Item>
                  <Dropdown.Item href="/kategorije">Kategorije</Dropdown.Item>
                  <Dropdown.Item href="/dodaj">Dodaj</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <div className=" d-none d-lg-block ">
            <nav className="navbar navbar-dark bg-dark text-white">
              <a className="nav-link text-white" href="/pocetna">
                Početna
              </a>
              <a className="nav-link text-white" href="/kategorije">
                Kategorije
              </a>

              <a className="nav-link text-white" href="/dodaj">
                Dodaj
              </a>
            </nav>
          </div>
          <div className="search d-none d-md-block">
            <input
              className="form-control"
              type="search"
              placeholder="Pretraživanje"
              value={query}
              onChange={(e) => {
                setQuery(
                  e.target.value.replace(
                    /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                    ""
                  )
                );
              }}
            ></input>
          </div>

          <CheckLogin />
        </div>
      </nav>

      <div className="input-group rounded d-flex d-md-none justify-items-center   ">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Pretraživanje"
          value={query}
          onChange={(e) => {
            setQuery(
              e.target.value.replace(
                /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
                ""
              )
            );
          }}
        />
      </div>
    </>
  );
};

export default Navbars;
