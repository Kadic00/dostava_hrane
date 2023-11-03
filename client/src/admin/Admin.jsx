import React, { useState, useEffect } from "react";
import "./admin.css";
import Footer from "../potreba/footer.jsx";
import Axios from "axios";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
} from "recharts";
export default function Admin() {
  const [korLista, setLista] = useState([]);
  const [graf1, setGraf1] = useState([]);
  const [graf2, setGraf2] = useState([]);
  const [graf3, setGraf3] = useState([]);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/admin").then((response) => {
      setLista(response.data);
    });
  }, []);

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:3001/grafik2").then((response) => {
      setGraf2(response.data);
    });
  }, []);

  const obrisi = (idbr) => {
    Axios.post("http://localhost:3001/admin", {
      idbr: idbr,
    }).then(alert("BRAVO"));
  };
  const grafik1 = (graf1) => {
    Axios.get(`http://localhost:3001/grafik1?graf1=${graf1}`)
      .then((response) => {
        setGraf1(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const grafik3 = (graf3) => {
    Axios.get(`http://localhost:3001/grafik3?graf3=${graf3}`)
      .then((response) => {
        setGraf3(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const data = [
    {
      naziv: "Erdoglija",
      broj: graf1.filter((it) => it.naselje === 1).length,
    },
    {
      naziv: "Bagremar",
      broj: graf1.filter((it) => it.naselje === 2).length,
    },
    {
      naziv: "Aerodrom",
      broj: graf1.filter((it) => it.naselje === 3).length,
    },
    {
      naziv: "Bubanj",
      broj: graf1.filter((it) => it.naselje === 4).length,
    },
  ];

  const data1 = [
    {
      name: "Pica",
      broj: graf2
        .filter((it) => it.tip === 1)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Palacinke",
      broj: graf2
        .filter((it) => it.tip === 2)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Rostilj",
      broj: graf2
        .filter((it) => it.tip === 3)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Sendvici",
      broj: graf2
        .filter((it) => it.tip === 4)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Piće",
      broj: graf2
        .filter((it) => it.tip === 5)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
  ];

  const data2 = [
    {
      name: "Pica",
      broj: graf3
        .filter((it) => it.tip === 1)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Palacinke",
      broj: graf3
        .filter((it) => it.tip === 2)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Rostilj",
      broj: graf3
        .filter((it) => it.tip === 3)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Sendvici",
      broj: graf3
        .filter((it) => it.tip === 4)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
    {
      name: "Piće",
      broj: graf3
        .filter((it) => it.tip === 5)
        .reduce((zbir, proizvod) => zbir + proizvod.cena, 0),
    },
  ];

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
    <div className="adm">
      <header>
        <div className="nas">ADMIN KONTROLNA TABLA</div>
      </header>
      <body>
        <div className="adminstr">
          <div>
            <table className="tabelaa">
              <div className="tab">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USERNAME</th>
                    <th>SIFRA</th>
                    <th>E-MAIL</th>
                    <th>NASELJE</th>
                    <th>ULICA</th>
                    <th>TELEFON</th>
                    <th>ROLA</th>
                    <th>IZMENI</th>
                    <th>UKLONI</th>
                  </tr>
                </thead>

                <tbody>
                  {korLista.map((val, key) => {
                    return (
                      <tr>
                        <td>{val.id_korisnika}</td>
                        <td>{val.username}</td>
                        <td>{val.sifra}</td>
                        <td>{val.mejl}</td>
                        <td>{switc(val.naselje)}</td>
                        <td>{val.ulica}</td>
                        <td>{val.telefon}</td>
                        <td>{val.rola === 1 ? "Admin" : "Korisnik"}</td>
                        <td>
                          <Link to={`/izmeni/${val.id_korisnika}`}>
                            <button className="dugadm">Izmeni korisnika</button>
                          </Link>
                        </td>
                        <td>
                          <button
                            className="dugadm"
                            onClick={() => obrisi(korLista[key].id_korisnika)}
                          >
                            Obrisi korisnika
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </div>
            </table>
            <div className="dugdod">
              <Link to={`/registracija`}>
                <button>Korisnik +</button>
              </Link>
              <Link to={`/dodpro`}>
                <button>Proizvod +</button>
              </Link>
            </div>
          </div>
          <div className="grafici">
            <div className="graf1">
              <div>
                <select onChange={(e) => grafik1(e.target.value)}>
                  <option value="1">Pica</option>
                  <option value="2">Palacinka</option>
                  <option value="3">Rostilj</option>
                  <option value="4">Sendvic</option>
                  <option value="5">Sok</option>
                </select>
                <label className="gr1">
                  Grafik ukupne prodaje proizvoda prema naselju
                </label>
                <BarChart
                  width={450}
                  height={200}
                  data={data}
                  margin={{ top: 40, left: 20, right: 0, bottom: -10 }}
                >
                  <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                  <XAxis dataKey="naziv"></XAxis>
                  <YAxis dataKey="broj"></YAxis>
                  <Bar dataKey="broj" fill="#13994b"></Bar>
                </BarChart>
              </div>
            </div>

            <div className="graf2">
              <div>
                <label className="gr2">
                  Grafik ukupnog profita po kategoriji hrane
                </label>
                <PieChart
                  width={400}
                  height={250}
                  margin={{ top: 20, left: 150, right: 0, bottom: 0 }}
                >
                  <Pie
                    dataKey="broj"
                    isAnimationActive={true}
                    data={data1}
                    cx="40%"
                    cy="40%"
                    outerRadius={80}
                    fill="#a31616"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </div>
            </div>
            <div className="graf3">
              <div>
                <select
                  name="korisnik"
                  onChange={(e) => grafik3(e.target.value)}
                >
                  {korLista.map((e, key) => {
                    return (
                      <option key={key} value={e.id_korisnika}>
                        {e.username}
                      </option>
                    );
                  })}
                </select>
                <label className="gr3">
                  Grafik profita korisnika po kategoriji hrane
                </label>
                <BarChart
                  width={450}
                  height={200}
                  data={data2}
                  margin={{ top: 30, left: 0, right: 0, bottom: -5 }}
                >
                  <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                  <XAxis dataKey="name"></XAxis>
                  <YAxis dataKey="broj"></YAxis>
                  <Bar dataKey="broj" fill="#8884d8"></Bar>
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </div>
  );
}
