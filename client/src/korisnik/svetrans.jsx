import Axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
export default function Svetrans() {
  const [trans, setTrans] = useState([]);
  const { id } = useParams();

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/trans").then((response) => {
      setTrans(response.data.filter((it) => it.id_kor == id));
    });
  }, [id]);
  return (
    <table className="tabela">
      <caption>Lista porudzbina</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Cena</th>
          <th>Datum</th>
          <th>Pogledaj</th>
        </tr>
      </thead>
      <tbody>
        {trans.map((val, key) => {
          return (
            <tr>
              <td>#{val.id_trans}</td>
              <td>{val.cena} din</td>
              <td>{val.datum}</td>

              <td>
                <Link to={`/tr/${val.id_trans}`}>
                  <button className="dugtrans">Pregled racuna</button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
