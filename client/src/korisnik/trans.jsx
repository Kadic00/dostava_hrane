import "../App.css";
import Nav from "../potreba/nav.jsx";
import "./korisnik.css";
import Footer from "../potreba/footer.jsx";

import Header from "../potreba/header.jsx";
import Pregled from "./pregled.jsx";
import Trans from "./svetrans";

export default function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="glavnoovde">
        <div>
          <Pregled />
        </div>
        <Trans />
      </div>
      <Footer />
    </div>
  );
}
