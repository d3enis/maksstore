import axios from "axios";

import "./Kartica.css";
const Kartica = ({ idProizvoda, kategorija, naslov, cijena, slika }) => {
  const addToCart = (id) => {
    if (
      localStorage.getItem("username") === null &&
      localStorage.getItem("id") === null
    ) {
      alert("Prijavi se");
      window.location.replace("/prijava");
      return;
    } else {
      axios
        .post("/kosarica/dodaj", {
          idKorisnika: localStorage.getItem("idKorisnika"),
          idProizvoda: idProizvoda,
          kolicina: 1,
        })
        .then((res) => {
          console.log(res);
          alert(res.data);
        })

        .catch((e) => console.log(e));
    }
  };

  return (
    <>
      <div className="kartica p-2">
        <small>{kategorija}</small>
        <div className="naslovv">
          <a href={"/proizvod/" + idProizvoda}>
            <h6>{naslov}</h6>
          </a>
        </div>

        <div className="slika d-flex justify-content-center">
          <a href={"/proizvod/" + idProizvoda}>
            <img
              className="img-fluid"
              style={{ width: "300px", height: "300px" }}
              src={slika}
              alt=""
            />
          </a>
        </div>

        <hr />
        <div className="kosarica d-flex m-2 justify-content-around align-items-center">
          <h5>
            {cijena.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
              " " +
              "kn"}{" "}
          </h5>
          <button onClick={() => addToCart(idProizvoda)}>
            <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default Kartica;
