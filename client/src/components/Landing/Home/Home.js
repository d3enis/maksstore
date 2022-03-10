import Navbar from "../../Navbar/Navbar";
import Content from "../../Content/Content";
import Footer from "../../Footer/Footer";
import { useState } from "react";
const Home = () => {
  const [query, setQuery] = useState("");
  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Content query={query} />

      <Footer />
    </>
  );
};

export default Home;
