import "./Kartica.css";

const Kartica = ({ slika, naziv, link }) => {
  return (
    <>
      <div className=" naslovP kartica p-2">
        <a href={"/kategorija/" + link}>
          <div className="slika d-flex justify-content-center">
            <img
              className="img-fluid"
              style={{ width: "300px", height: "300px" }}
              src={slika}
              alt=""
            />
          </div>

          <hr />
          <div className="kosarica d-flex m-2 justify-content-around align-items-center">
            <h5>{naziv}</h5>
          </div>
        </a>
      </div>
    </>
  );
};

export default Kartica;
