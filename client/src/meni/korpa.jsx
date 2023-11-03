import "../App.css";
import "./korpa.css";
import Nav from "../potreba/nav.jsx";
import Header from "../potreba/header.jsx";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import Footer from "../potreba/footer.jsx";

export default function App() {
  const [nam, setNam] = useState([]);
  const [dostava, setDostava] = useState("");
  const [kes, setKes] = useState("");
  const [kor, setKor] = useState();
  const [trans, setTrans] = useState();
  const [tekst, setTekst] = useState("");

  const krm = parseInt(kes) === 0 ? 0 : 1;
  const ukupno = nam
    .map((it) => it.cena)
    .reduce((ukupno, vr) => ukupno + vr, 0);
  const radioDostava = (event) => {
    setDostava(event.target.value);
  };

  const radioKes = (event) => {
    setKes(event.target.value);
  };

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/korpa").then((response) => {
      setNam(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setKor(response.data.user[0].id_korisnika);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/trans").then((response) => {
      setTrans(
        response.data[
          Object.keys(response.data)[Object.keys(response.data).length - 1]
        ].id_trans
      );
    });
  }, []);

  const obrisi = (idbr) => {
    Axios.post("http://localhost:3001/obrisi_korpa", {
      idbr: idbr,
    }).then(window.location.reload());
  };
  const poruci = function () {
    if (kor !== null && nam.length !== 0) {
      Axios.post("http://localhost:3001/placanje", {
        kes: krm,
        kor: kor,
        ukupno: ukupno,
        tekst: tekst,
        datum: new Date().toLocaleString(),
      }).then(() => {
        alert("Uspesno ste uneli u korpu!");
        window.location.reload();
      });
      nam.forEach((ele) => {
        Axios.post("http://localhost:3001/urp", {
          trans: trans + 1,
          kor: kor,
          pro: ele.id_artikal,
        });
      });
    } else {
      alert("Niste prijavljeni ili je prazna korpa!");
    }
  };

  return (
    <div className="app">
      <Header />
      <Nav />
      <div>
        <div className="korpa">
          <div className="korpa-naslov">
            <div className="cenatran">
              Ukupno:
              {parseInt(ukupno)} din
            </div>
          </div>
          <div className="korpa-sadrzaj">
            <table className="tabela_korpa">
              <tbody>
                {nam.map((val, key) => {
                  return (
                    <tr>
                      <td className="korpa_sli">
                        <img src={val.slika} alt="Slika" />
                      </td>
                      <td>{val.naziv}</td>
                      <td>CENA: {val.cena}din</td>
                      <td>
                        <button
                          className="dugme_korpa_brisanje"
                          onClick={() => obrisi(nam[key].id_artikal)}
                        >
                          Ukloni
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="ost">
        <div className="rad">
          <label>Placanje:</label>
          <input
            type="radio"
            value="0"
            name="placanje"
            checked={kes === "0"}
            onChange={radioKes}
          />
          Kes
          <input
            type="radio"
            value="5"
            name="placanje"
            checked={kes === "5"}
            onChange={radioKes}
          />
          Kartica
        </div>
        <div className="komentar_korpa">
          <label>Dodatni komentar:</label>
          <textarea
            onChange={(e) => {
              setTekst(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="dp" onClick={poruci}>
          Poruci
        </button>
      </div>
      <Footer />
    </div>
  );
}
