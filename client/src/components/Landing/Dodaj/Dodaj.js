import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import axios from "axios";
const Dodaj = () => {
  const [naziv, setNaziv] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [cijena, setCijena] = useState(0);
  const [opis, setOpis] = useState("");
  const [slika, setSlika] = useState({
    myFile: "",
  });

  const setChange = (e, setChange) => {
    setChange(e.target.value);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setSlika({ ...slika, myFile: base64 });
  };

  const updateHandler = () => {
    axios
      .post("http://localhost:3001/proizvod/dodaj", {
        naziv: naziv,
        kategorija: kategorija,
        cijena: cijena,
        opis: opis,
        slika: slika,
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    alert("Proizvod dodan");
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>
      <Navbar />
      <div className="container-sm-fluid container-md  my-5 mx-auto">
        <div className="row d-flex justify-content-center ">
          <div className="col-6">
            <form>
              <div className="form-outline mb-4">
                <label className="form-label">Naziv proizvoda</label>
                <input
                  type="text"
                  id="form2Example1"
                  className="form-control"
                  value={naziv}
                  onChange={(e) => setChange(e, setNaziv)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Kategorija</label>
                <select
                  className="form-select  "
                  onChange={(e) => setChange(e, setKategorija)}
                >
                  <option>Odaberi kategoriju</option>
                  <option value="Grafičke kartice">Grafičke kartice</option>
                  <option value="Matične ploče">Matične ploče</option>
                  <option value="Pohrana">Pohrana</option>
                  <option value="Memorije">Memorije</option>
                  <option value="Procesori">Procesori</option>
                  <option value="Zvučne kartice">Zvučne kartice</option>
                  <option value="Kućišta">Kućišta</option>
                  <option value="Napajanja">Napajanja</option>
                  <option value="Prijenosna računala">
                    Prijenosna računala
                  </option>
                  <option value="Ventilatori">Ventilatori</option>
                  <option value="Hladnjaci">Kućišta</option>
                </select>
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Opis</label>
                <textarea
                  className="form-control"
                  id="opis"
                  rows="6"
                  value={opis}
                  onChange={(e) => setChange(e, setOpis)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Cijena</label>
                <input
                  type="text"
                  id="cijenaInput"
                  className="form-control"
                  value={cijena}
                  onChange={(e) => setChange(e, setCijena)}
                />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Slika</label>
                <input
                  type="file"
                  id="slikaInput"
                  className="form-control"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleUpload(e)}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-3 d-flex justify-content-center">
            <button
              type="submit"
              onClick={updateHandler}
              className="btn btn-primary btn-block mb-4"
            >
              Dodaj proizvod
            </button>
          </div>
          <div className="col-3 d-flex justify-content-center">
            <button type="reset" className="btn btn-danger btn-block mb-4">
              Obriši
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dodaj;
