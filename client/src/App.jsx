import "./App.css";
import Nav from "./potreba/nav.jsx";
import Glavno from "./potreba/glavno.jsx";
import Header from "./potreba/header.jsx";
import Footer from "./potreba/footer.jsx";
export default function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <Glavno />
      <div class="footer">
        <p>NAZIV APLIKACIJE</p>
      </div>
      <Footer />
    </div>
  );
}
