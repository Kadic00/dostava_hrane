import React, { useState, useEffect } from "react";
import "./stil.css";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function Header() {
  Axios.defaults.withCredentials = true;

  const [pro, setPro] = useState("");
  const [kontr, setKontr] = useState("");
  const [nam, setNam] = useState([]);
  const [kor, setKor] = useState("");

  const ajde = function () {
    Axios.get("http://localhost:3001/clear-cookie", {}).then(alert("Odjava"));
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setKor(response.data.user[0]);
        setPro(
          <a href="/log-in" onClick={() => ajde()}>
            Izloguj se
          </a>
        );
        setKontr(
          response.data.user[0].rola == 1 ? (
            <a href="/admin">Admin-Kontrolna Tabla</a>
          ) : (
            <div class="dropdown">
              <Link to={`/trans/${response.data.user[0].id_korisnika}`}>
                Korisnik informacije
              </Link>
            </div>
          )
        );
      } else {
        setPro(<a href="/log-in">Uloguj se</a>);
      }
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3001/korpa").then((response) => {
      setNam(
        response.data.filter((it) => it.id_korisnika === kor.id_korisnika)
      );
    });
  }, [nam]);

  return (
    <header>
      <div className="prijave">
        {pro}
        <a href="/korpa">
          Korpa--<span class="korbr">{nam.length}</span>
        </a>

        {kontr}
      </div>
    </header>
  );
}
