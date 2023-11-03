import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Log from "./log-in/log-in.jsx";
import Reg from "./log-in/Registracija.jsx";
import Adm from "./admin/Admin.jsx";
import Meni from "./meni/meni.jsx";
import Izmeni from "./admin/izmeni.jsx";
import Transakcije from "./korisnik/trans.jsx";

import Korpa from "./meni/korpa.jsx";

import Trans from "./korisnik/tr.jsx";
import Utisak from "./log-in/utisci.jsx";
import Proizvod from "./admin/dodpro.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "log-in",
    element: <Log />,
  },
  {
    path: "registracija",
    element: <Reg />,
  },
  {
    path: "admin",
    element: <Adm />,
  },
  {
    path: "meni",
    element: <Meni />,
  },
  {
    path: "meni/:kl",
    element: <Meni />,
  },
  {
    path: "izmeni/:idiz",
    element: <Izmeni />,
  },

  {
    path: "trans/:id",
    element: <Transakcije />,
  },
  {
    path: "korpa",
    element: <Korpa />,
  },
  {
    path: "korpa/:kp",
    element: <Korpa />,
  },

  {
    path: "tr/:tr",
    element: <Trans />,
  },
  {
    path: "utisak",
    element: <Utisak />,
  },
  {
    path: "dodpro",
    element: <Proizvod />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
