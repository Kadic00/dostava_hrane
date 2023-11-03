import { useParams } from "react-router-dom";
import Nav from "../potreba/nav.jsx";
import Header from "../potreba/header.jsx";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import "./racun.css";
import Footer from "../potreba/footer.jsx";

export default function App() {
  const { tr } = useParams();

  const [trans, setTrans] = useState([]);
  const [kor, setKor] = useState([]);
  const [id, setId] = useState();
  const [nam, setNam] = useState();
  const [pro, setPro] = useState([]);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/trans").then((response) => {
      setTrans(response.data.filter((it) => it.id_trans == tr));
      const filteredTrans = response.data.filter((it) => it.id_trans == tr);
      if (filteredTrans.length > 0 && filteredTrans[0].id_kor !== undefined) {
        setId(filteredTrans[0].id_kor);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      setKor(response.data.filter((it) => it.id_korisnika == id));
    });
  }, [trans]);

  useEffect(() => {
    Axios.get("http://localhost:3001/urp").then((response) => {
      if (trans !== null && trans.length > 0 && response.data.length > 0) {
        setNam(response.data.filter((it) => it.id_trans === trans[0].id_trans));
      }
    });
  }, [trans]);

  useEffect(() => {
    Axios.get("http://localhost:3001/meni").then((response) => {
      if (nam !== undefined && nam.length > 0 && response.data.length > 0) {
        const filteredData = response.data.filter((it) =>
          nam.some((element) => element.id_proizvod === it.id_hrane)
        );
        setPro(filteredData);
      }
    });
  }, [nam]);

  const switc = function (tar) {
    switch (tar) {
      case 1:
        return "Erdoglija";
        break;
      case 2:
        return "Bagremar";
        break;
      case 3:
        return "Aerodrom";
        break;
      case 4:
        return "Bubanj";
        break;
    }
  };

  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="racun">
        {trans.length > 0 && kor.length > 0 ? (
          <React.Fragment>
            <div className="id">
              <h1>Racun #{trans[0].id_trans}</h1>
            </div>

            <div className="kupac">
              <div className="polje">
                <label>Username:</label>
                <span>{kor[0].username}</span>
              </div>
              <div className="polje">
                <label>E-mail:</label>
                <span>{kor[0].mejl}</span>
              </div>
              <div className="polje">
                <label>Naselje:</label>
                <span>{switc(kor[0].naselje)}</span>
              </div>
              <div className="polje">
                <label>Ulica:</label>
                <span>{kor[0].ulica}</span>
              </div>
              <div className="polje">
                <label>Telefon:</label>
                <span>{kor[0].telefon}</span>
              </div>
              <div className="polje">
                <label>Tekst:</label>
                <span>
                  {trans[0].tekst === ""
                    ? "Nema dodatnog komentara"
                    : trans[0].tekst}
                </span>
              </div>
              <div className="polje">
                <label>Plaćanje:</label>
                <span>
                  {trans[0].placanje === 1
                    ? "Plaćanje se vrši karticom."
                    : "Plaćanje se vrši pouzećem"}
                </span>
              </div>
            </div>
            <div className="trans">
              <table className="tabelica">
                <thead>
                  <tr>
                    <th>Naziv</th>
                    <th>Cena</th>
                  </tr>
                </thead>
                <tbody>
                  {pro.map((pr, i) => {
                    return (
                      <tr>
                        <td>{pr.naziv}</td>
                        <td>{pr.cena}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="poljee">
              <label>Ukupna cena: </label>
              <span>{(trans[0].dost === 1 ? 300 : 0) + trans[0].cena}din</span>
            </div>
          </React.Fragment>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
