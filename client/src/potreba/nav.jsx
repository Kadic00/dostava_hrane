import React from "react";
import "./stil.css";
import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navs">
      <div className="navic">
        <a href="/" alt="akcije">
          Pocetna
        </a>
        <a href="/meni" alt="meni">
          Meni
        </a>

        <div class="dropdown">
          <button class="dropbtn">Kategorija</button>
          <div class="dropdown-content">
            <a href="/meni/1">Pice</a>
            <a href="/meni/2">Palacinke</a>
            <a href="/meni/3">Rostilj</a>
            <a href="/meni/4">Sendvici</a>
            <a href="/meni/5">Sokovi</a>
          </div>
        </div>

        <a href="/utisak" alt="alo">
          Utisci
        </a>
      </div>
    </nav>
  );
}
