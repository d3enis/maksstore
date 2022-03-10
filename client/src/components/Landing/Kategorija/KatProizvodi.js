import Kartica from "../../Content/Kartica/Kartica";
import "../../Content/Content.css";
import Footer from "../../Footer/Footer";
import Navbar from "../../Navbar/Navbar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const KatProizvodi = () => {
  let { kategorija } = useParams();
  console.log(kategorija);
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios.get(`/kategorije/${kategorija}`).then((res) => setContent(res.data));
  }, [kategorija]);

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex flex-wrap justify-content-around my-2 ">
        <>
          <div className="row g-3 w-100 ">
            {content.map((content) => (
              <div
                key={content.idProizvoda}
                className="col-sm-6 col-md-4 col-lg-3 "
              >
                <Kartica
                  idProizvoda={content.idProizvoda}
                  kategorija={content.kategorijaProizvoda}
                  naslov={content.nazivProizvoda}
                  opis={content.opisProizvoda}
                  cijena={content.cijenaProizvoda}
                  slika={content.slikaProizvoda}
                />
              </div>
            ))}
          </div>
        </>
      </div>
      <Footer />
    </>
  );
};

export default KatProizvodi;
<></>;
