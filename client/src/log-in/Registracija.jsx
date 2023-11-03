import React, { useState, useEffect } from "react";
import "./log-in.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../potreba/footer.jsx";

export default function Registracija() {
  const [user, setUser] = useState("");
  const [sifra, setSifra] = useState("");
  const [mejl, setMejl] = useState("");
  const [naselje, setNaselje] = useState("");
  const [ulica, setUlica] = useState("");
  const [telefon, setTelefon] = useState("");

  const submitt = () => {
    Axios.post("http://localhost:3001/reg", {
      user: user,
      sifra: sifra,
      mejl: mejl,
      naselje: naselje,
      ulica: ulica,
      telefon: telefon,
    }).then(alert("Uspesno ste se registrovali"));
  };

  return (
    <div className="reg">
      <div className="registracija">
        <h1>Registracija</h1>
        <input
          type="text"
          name="user"
          placeholder="Korisničko ime"
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />
        <input
          type="text"
          name="sifra"
          placeholder="Šifra"
          onChange={(e) => {
            setSifra(e.target.value);
          }}
          required
        />
        <input
          type="e-mail"
          name="mejl"
          placeholder="E-mail"
          onChange={(e) => {
            setMejl(e.target.value);
          }}
          required
        />
        <select
          onChange={(e) => {
            const nas = e.target.value;
            setNaselje(nas);
          }}
        >
          <option value="1">Bagremar</option>
          <option value="2">Aerodrom</option>
          <option value="3">Erdoglija</option>
        </select>
        <input
          type="text"
          name="ulica"
          placeholder="Ulica"
          required
          onChange={(e) => {
            setUlica(e.target.value);
          }}
        />
        <input
          type="text"
          name="telefon"
          placeholder="Telefon"
          onChange={(e) => {
            setTelefon(e.target.value);
          }}
          required
        />

        <Link to={`/log-in`}>
          <button className="login-btn" onClick={submitt}>
            Registruj se!
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
