import "../App.css";
import Nav from "../potreba/nav.jsx";
import Header from "../potreba/header.jsx";
import { Product } from "./product.jsx";
import "./kartica.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import PRO from "./proizvod.jsx";
import Footer from "../potreba/footer.jsx";

export default function Meni() {
  const [korLista, setLista] = useState([]);
  const [pretraga, setPre] = useState("");
  const [prb, setProb] = useState();
  const { kl } = useParams();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/meni").then((response) => {
      kl === undefined
        ? setLista(response.data)
        : setLista(response.data.filter((it) => it.tip == kl));
    });
  }, []);

  return (
    <div className="app">
      <Header />
      <Nav />
      <PRO pro={prb} />

      <div className="srch">
        <form>
          <input
            className="prtg"
            type="search"
            onChange={(e) => {
              setPre(e.target.value);
            }}
          ></input>
        </form>
      </div>
      <div className="proba">
        {korLista
          .filter((it) => {
            return pretraga.toLowerCase() === ""
              ? it
              : it.naziv.toLowerCase().includes(pretraga.toLowerCase());
          })
          .map((val, key) => {
            return (
              <Product
                key={val.id_hrane}
                image={val.slika}
                name={val.naziv}
                price={val.cena}
                id={val.id_hrane}
                tip={val.tip}
                alo={setProb}
              />
            );
          })}
      </div>
      <div class="overlay hidden"></div>
      <Footer />
    </div>
  );
}
