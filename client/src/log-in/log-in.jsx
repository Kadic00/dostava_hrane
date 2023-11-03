import React, { useState, useEffect } from "react";
import "./log-in.css";
import Axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../potreba/footer.jsx";

export default function Login() {
  const [user, setUser] = useState("");
  const [sifra, setSifra] = useState("");

  const [login, setLogin] = useState("");
  Axios.defaults.withCredentials = true;
  const log = () => {
    Axios.post("http://localhost:3001/login", {
      username: user,
      sifra: sifra,
    }).then((response) => {
      console.log(response.data);
      window.location.reload();
    });
  };

  return (
    <div className="log">
      <div className="logovanje">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setSifra(e.target.value);
          }}
        />
        <Link to={`/meni`}>
          <button className="login-btn" onClick={log}>
            Login
          </button>
        </Link>
        <div>
          <a href="/registracija">Nemas nalog ?</a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
