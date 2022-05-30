import Home from "./components/Landing/Home/Home";
import Dodaj from "./components/Landing/Dodaj/Dodaj";
import Kosarica from "./components/Landing/Kosarica/Kosarica";
import Proizvod from "./components/Landing/Proizvod/Proizvod";
import Registracija from "./components/Landing/Registracija/Registracija";
import Narudzba from "./components/Landing/Narudzba/Narudzba";
import Prijava from "./components/Landing/Prijava/Prijava";
import KatProizvodi from "./components/Landing/Kategorija/KatProizvodi";

import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Landing/Profile/Profile";
import Kategorija from "./components/Landing/Kategorija/Kategorija";

function App() {


  return (
    <>
      
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route exact path="/pocetna" element={<Home />} />
              <Route exact path="/proizvodi/:id" element={<Proizvod />} />
              <Route exact path="/dodaj" element={<Dodaj />} />
              <Route exact path="/registracija" element={<Registracija />} />
              <Route exact path="/prijava" element={<Prijava />} />
              <Route exact path="/profil" element={<Profile />} />
              <Route exact path="/kosarica" element={<Kosarica />} />
              <Route exact path="/narudzba" element={<Narudzba />} />
              <Route exact path="/kategorija" element={<Kategorija />} />
              <Route
                exact
                path="/kategorija/:kategorija"
                element={<KatProizvodi />}
              />
              <Route component={Home} />
            </Routes>
          </div>
        </Router>
      
    </>
  );
}

export default App;
