import "../App.css";
import "./korisnik.css";

import React, { useState, useEffect, useHistory } from "react";
import Axios from "axios";
export default function Pregl() {
  const [kor, setKor] = useState("");
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setKor(response.data.user[0]);
      }
    });
  });
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
      <div className="informacije">
        <h1>Informacije o korisniku</h1>
        <div className="podatak" id="pr">
          <label>Usrename:</label>
          <span>{kor.username}</span>
        </div>
        <div className="podatak" id="dr">
          <label>Sifra:</label>
          <span>{kor.sifra}</span>
        </div>
        <div className="podatak" id="tr">
          <label>Mejl:</label>
          <span>{kor.mejl}</span>
        </div>
        <div className="podatak" id="cet">
          <label>Naselje:</label>
          <span>{switc(kor.naselje)}</span>
        </div>
        <div className="podatak" id="pet">
          <label>Ulica:</label>
          <span>{kor.ulica}</span>
        </div>
        <div className="podatak" id="ses">
          <label>Telefon:</label>
          <span>{kor.telefon}</span>
        </div>
      </div>
    </div>
  );
}
