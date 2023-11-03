import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Axios from "axios";

export function Product(props) {
  const otvori = function (val) {
    props.alo(val);
  };

  const [ocena, setOc] = useState([]);
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/ocena").then((response) => {
      setOc(response.data);
    });
  }, []);

  return (
    <div className="kartica" onClick={() => otvori(props)}>
      <div className="kolona">
        <div className="karta">
          <div className="kart-slika">
            <a href="#">
              {props.image.length < 20 ? (
                <img src={"../slike/" + props.image} alt="Slika" />
              ) : (
                <img src={props.image} height="200" alt="Slika"></img>
              )}
            </a>
          </div>
          <div className="bord">
            <div className="rstva">
              <label>Naziv:</label>
              <span>{props.name}</span>
            </div>
            <div className="rstva">
              <label>Cena:</label>
              <span>{props.price} din</span>
            </div>
            <div className="rstva">
              <label>Ocena:</label>
              <span>
                {ocena.filter((it) => it.id_pro === props.id).length > 0 ? (
                  <>
                    {Math.round(
                      ocena
                        .filter((it) => it.id_pro === props.id)
                        .reduce((zbir, proizvod) => zbir + proizvod.ocena, 0) /
                        ocena.filter((it) => it.id_pro === props.id).length
                    )}{" "}
                    <FaStar />
                  </>
                ) : (
                  "Nema ocene"
                )}
              </span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
