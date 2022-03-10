import Kartica from "./Kartica/Kartica";
import "./Content.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Content = ({ query }) => {
  const [content, setContent] = useState([]);
  console.log(query.length);
  if (query.trim().length === 0) {
    query = "default";
  }
  useEffect(() => {
    console.log(typeof query);
    if (query.charAtCode == 48) {
    }
    axios
      .get("http://localhost:3001/proizvod/query/" + query)
      .then((res) => setContent(res.data));
  }, [query]);
  console.log(content);
  return (
    <>
      <div className="container-fluid d-flex flex-wrap justify-content-around my-2 ">
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
      </div>
    </>
  );
};

export default Content;
<></>;
