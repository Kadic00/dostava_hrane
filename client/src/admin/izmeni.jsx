import "./admin.css";
import Axios from "axios";
import { useParams } from "react-router-dom";

import React, { useState, useEffect } from "react";

export default function Izmeni() {
  const [user, setUser] = useState("");
  const [sifra, setSifra] = useState("");
  const [mejl, setMejl] = useState("");
  const [naselje, setNaselje] = useState("");
  const [ulica, setUlica] = useState("");
  const [telefon, setTelefon] = useState("");

  const { idiz } = useParams();
  const [kor, setKor] = useState();
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      setKor(response.data.filter((it) => it.id_korisnika == idiz));
    });
  }, []);

  const izmeni = () => {
    Axios.post("http://localhost:3001/izmeni", {
      user: user,
      sifra: kor[0].sifra !== undefined ? "" : kor[0].sifra,
      mejl: mejl,
      naselje: naselje,
      ulica: ulica,
      telefon: telefon,
      idneki: kor.id_korisnika,
    }).then(alert("Uspesna registracija"));
  };

  return (
    <div>
      <div className="izmeni_admin">
        <h1>Izmeni podatke</h1>
        <input
          type="text"
          name="user"
          placeholder={kor && kor[0] ? kor[0].username : ""}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
        />

        <input
          type="e-mail"
          name="mail"
          placeholder={kor && kor[0] ? kor[0].mejl : ""}
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
          placeholder={kor && kor[0] ? kor[0].ulica : ""}
          required
          onChange={(e) => {
            setUlica(e.target.value);
          }}
        />
        <input
          type="text"
          name="telefon"
          placeholder={kor && kor[0] ? kor[0].telefon : ""}
          onChange={(e) => {
            setTelefon(e.target.value);
          }}
          required
        />
        <button className="login-btn" onClick={izmeni}>
          <a href="/admin">Izmeni korisnika</a>
        </button>
      </div>
    </div>
  );
}
