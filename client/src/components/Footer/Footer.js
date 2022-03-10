import "./Footer.css";

const Footer = () => {
  return (
    <div
      className="container-fluid text-center text-white"
      style={{ background: "#212529" }}
    >
      <section className="">
        <div className="row text-center d-flex justify-content-center pt-5">
          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">
                O nama
              </a>
            </h6>
          </div>

          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">
                Ponuda
              </a>
            </h6>
          </div>

          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">
                Nagrade
              </a>
            </h6>
          </div>

          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">
                Pomoć
              </a>
            </h6>
          </div>

          <div className="col-md-2">
            <h6 className="text-uppercase font-weight-bold">
              <a href="#!" className="text-white">
                Kontakt
              </a>
            </h6>
          </div>
        </div>
      </section>

      <hr className="my-5" />

      <section className="mb-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 ">
            <h5 className="font-weight-light text-white">
              Prijavi se na naš newsletter :
            </h5>

            <input
              type="text"
              id="formControlmd"
              className="form-control form-control-lg"
              placeholder="Unesite svoj e-mail"
            />
          </div>
        </div>
      </section>

      <section className="text-center mb-5">
        <a href="" className="text-white me-4">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="" className="text-white me-4">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="" className="text-white me-4">
          <i className="fab fa-google"></i>
        </a>
        <a href="" className="text-white me-4">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="" className="text-white me-4">
          <i className="fab fa-linkedin"></i>
        </a>
        <a href="" className="text-white me-4">
          <i className="fab fa-github"></i>
        </a>
      </section>

      <div
        className="text-center p-3"
        style={{ background: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2022 Copyright:
        <a className="text-white" href="">
          MaksStore.com
        </a>
      </div>
    </div>
  );
};

export default Footer;
