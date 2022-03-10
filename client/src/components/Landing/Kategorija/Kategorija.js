import Kartica from "./Kartica/Kartica";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import gpu from "./pics/gpu.jpg";
import cpu from "./pics/cpu.jpg";
import mbo from "./pics/mbo.jpg";
import psu from "./pics/psu.jpg";
import mem from "./pics/mem.jpg";
import laptop from "./pics/laptop.jpg";
import storage from "./pics/storage.jpg";
import pc from "./pics/case.jpg";
const Kategorija = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex flex-wrap justify-content-around my-2 ">
        <div className="row g-3 w-100 ">
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica
              naziv={"Grafičke kartice"}
              slika={gpu}
              link={"Grafičke kartice"}
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica naziv={"Procesori"} slika={cpu} link={"Procesori"} />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica
              naziv={"Matične ploče"}
              slika={mbo}
              link={"Matične ploče"}
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica naziv={"Napajanja"} slika={psu} link={"Napajanja"} />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica
              naziv={"Pohrana podataka"}
              slika={storage}
              link={"Pohrana"}
            />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica naziv={"Radna memorija"} slika={mem} link={"Memorije"} />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica naziv={"Kućišta"} slika={pc} link={"Kućišta"} />
          </div>
          <div className="col-sm-6 col-md-4 col-lg-3 ">
            <Kartica
              naziv={"Prijenosna računala"}
              slika={laptop}
              link={"Prijenosna računala"}
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Kategorija;
