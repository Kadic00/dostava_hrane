import "../App.css";
import Nav from "../potreba/nav.jsx";
import Header from "../potreba/header.jsx";
import "./utisci.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../potreba/footer.jsx";
import { FaStar } from "react-icons/fa";

export default function App() {
  const overlay = document.querySelector(".overlay");

  const mod = document.querySelector(".mod");
  const [kom, setKom] = useState([]);
  const [km, setKm] = useState("");
  const [kor, setKor] = useState("");
  const [komentar, setKomentar] = useState("");
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/ocena").then((response) => {
      setKom(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      if (komentar !== undefined && komentar.length > 0) {
        setKor(
          response.data.filter((it) => it.id_korisnika === komentar[0].id_kor)
        );
      }
    });
  }, [komentar]);
  useEffect(() => {
    Axios.get("http://localhost:3001/ocena").then((response) => {
      if (km !== undefined) {
        setKomentar(response.data.filter((it) => it.id_kom === km));
      }
    });
  }, [km]);
  const openModal = function (alo) {
    mod.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setKm(alo);
  };

  const closeModal = function () {
    mod.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  console.log(kor);
  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="tabla">
        {kom.map((val, key) => {
          return (
            <div className="kom" onClick={() => openModal(val.id_kom)}>
              <label>
                Komentar<br></br>#{val.id_kom}
              </label>
            </div>
          );
        })}
      </div>

      <div className="mod hidden">
        <button class="zatvori" onClick={() => closeModal()}>
          X
        </button>
        <div className="kor">
          <label>ID Korisnika: </label>
          <span>{kor.length > 0 ? kor[0].id_korisnika : ""}</span>
        </div>
        <div className="kor">
          <label>Username: </label>
          <span>{kor.length > 0 ? kor[0].username : ""}</span>
        </div>
        <div className="kor">
          <label>Komentar: </label>
          <span>{komentar.length > 0 ? komentar[0].text : ""}</span>
        </div>
        <div className="kor">
          <label>ID Proizvoda: </label>
          <span>{komentar.length > 0 ? komentar[0].id_pro : ""}</span>
        </div>

        <div className="kor">
          <label>Ocena: </label>
          <span>
            {komentar.length > 0 ? komentar[0].ocena : ""} <FaStar />
          </span>
        </div>
      </div>

      <div class="overlay hidden"></div>
      <Footer />
    </div>
  );
}
