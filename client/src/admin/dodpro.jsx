import "./admin.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function DodajProizvod() {
  const [naziv, setNaziv] = useState("");
  const [kategorija, setKategorija] = useState("");
  const [cena, setCena] = useState("");
  const [slika, setSlika] = useState("");

  const dodaj = () => {
    Axios.post("http://localhost:3001/dodajproizvod", {
      naziv: naziv,
      kategorija: kategorija,
      cena: cena,
      slika: slika[0].name,
    }).then(alert("Uspesno dodavanje proizvoda!"));
  };
  console.log(kategorija);
  return (
    <div className="dodajproizvod">
      <h1>Dodaj proizvod</h1>
      <input
        type="text"
        name="naziv"
        placeholder="naziv"
        onChange={(e) => setNaziv(e.target.value)}
        required
      />
      <select
        onChange={(e) => {
          const kat = e.target.value;
          setKategorija(kat);
        }}
      >
        <option value="1">Pica</option>
        <option value="2">Palacinke</option>
        <option value="3">Roštilj</option>
        <option value="4">Sendviči</option>
        <option value="5">Piće</option>
      </select>
      <input
        type="text"
        name="cena"
        placeholder="cena"
        onChange={(e) => setCena(e.target.value)}
        required
      />
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        multiple
        onChange={(e) => setSlika(e.target.files)}
      />
      <button className="login-btn" onClick={dodaj}>
        <a href="/admin">Dodaj proizvod</a>
      </button>
    </div>
  );
}
