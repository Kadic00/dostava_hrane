import "./kartica.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./product.jsx";
import { FaStar } from "react-icons/fa";
export default function Pro({ pro }) {
  const [tekst, setTekst] = useState("");
  const [ocena, setOcena] = useState("");
  const [kor, setKor] = useState("");

  const kategorija = function (tar) {
    switch (tar) {
      case 1:
        return "Pice";
        break;
      case 2:
        return "Palacinke";
        break;
      case 3:
        return "Roštilj";
        break;
      case 4:
        return "Sendvici";
        break;
      case 5:
        return "Piće";
        break;
    }
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn == true) {
        setKor(response.data.user[0].id_korisnika);
      }
    });
  });
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const kart = document.querySelectorAll(".kartica");

  const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  for (let i = 0; i < kart.length; i++)
    kart[i].addEventListener("click", openModal);

  const oceni = function () {
    if (kor != "" || pro != "") {
      Axios.post("http://localhost:3001/ocena", {
        tekst: tekst,
        ocena: ocena,
        kor: kor,
        proi: pro.id,
      }).then(window.location.reload());
    } else {
      alert("Niste prijavljeni nije moguce komentarisati!");
    }
  };
  const radioPost = (event) => {
    setOcena(event.target.value);
  };
  const dodaj = () => {
    if (pro != "") {
      Axios.post("http://localhost:3001/korpa", {
        kroki: pro.id,
        krokii: pro.name,
        krokiii: pro.price,
        krokiiii: kor,
        krokiiiii: pro.image,
      }).then(() => {
        alert("Uspesno ste uneli u korpu!");
      });
    } else {
      alert("Greska");
    }
  };
  return (
    <div>
      <div className="modal hidden">
        <button class="zatvori" onClick={() => closeModal()}>
          X
        </button>

        <div className="slika">
          {pro === undefined ? (
            <img src="" alt="Slika" />
          ) : pro.image.length < 15 ? (
            <img src={"./slike/" + pro.image} alt="Slika" />
          ) : (
            <img src={pro.image} alt="Slika" />
          )}

          <div className="kar">
            <div className="naslov">
              {pro === undefined ? <span></span> : <span>{pro.name}</span>}
            </div>
            <div className="sio">
              <label>Kategorija:</label>
              {pro === undefined ? (
                <span></span>
              ) : (
                <span>{kategorija(pro.tip)}</span>
              )}
            </div>
            <div className="sio">
              <label>Cena:</label>
              {pro === undefined ? <span></span> : <span>{pro.price}din</span>}
            </div>

            <button className="dugpor" onClick={dodaj}>
              Poruci
            </button>

            <div className="ocena">
              <div>
                <input
                  type="text"
                  onChange={(e) => {
                    setTekst(e.target.value);
                  }}
                  required
                />
                <button onClick={oceni}>Oceni</button>
              </div>
              <div className="rad">
                <input
                  type="radio"
                  value="1"
                  name="ocena"
                  checked={ocena === "1"}
                  onChange={radioPost}
                />
                1<FaStar />
                <input
                  type="radio"
                  value="2"
                  name="ocena"
                  checked={ocena === "2"}
                  onChange={radioPost}
                />
                2<FaStar />
                <input
                  type="radio"
                  value="3"
                  name="ocena"
                  checked={ocena === "3"}
                  onChange={radioPost}
                />
                3<FaStar />
                <input
                  type="radio"
                  value="4"
                  name="ocena"
                  checked={ocena === "4"}
                  onChange={radioPost}
                />
                4<FaStar />
                <input
                  type="radio"
                  value="5"
                  name="ocena"
                  checked={ocena === "5"}
                  onChange={radioPost}
                />
                5<FaStar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
