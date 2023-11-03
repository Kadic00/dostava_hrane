const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { createPool } = require("mysql");
const session = require("express-session");
const cookie = require("cookie-parser");

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "hrana",
});
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookie());
app.use(express.json());
app.use(
  session({
    key: "user",
    secret: "sub",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 10000,
    },
  })
);

app.get("/clear-cookie", (request, response) => {
  response.clearCookie("user");
  response.send("Cookie cleared");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/reg", (req, res) => {
  const user = req.body.user;
  const sif = req.body.sifra;
  const mejl = req.body.mejl;
  const naselje = req.body.naselje;
  const ulica = req.body.ulica;
  const mob = req.body.telefon;
  const qur =
    "INSERT INTO korisnik (username,sifra,mejl,naselje,ulica,telefon) VALUES (?,?,?,?,?,?)";
  pool.query(qur, [user, sif, mejl, naselje, ulica, mob], (err, result) => {
    console.log(err);
  });
});

app.post("/izmeni", (req, res) => {
  const user = req.body.user;
  const sif = req.body.sifra;
  const mejl = req.body.mejl;
  const naselje = req.body.naselje;
  const ulica = req.body.ulica;
  const mob = req.body.telefon;
  const idn = req.body.idneki;
  const qur =
    "UPDATE korisnik SET username=?, sifra=?, mejl=?, naselje=?, ulica=?, telefon=? WHERE id_korisnika=?";

  pool.query(
    qur,
    [user, sif, mejl, naselje, ulica, mob, idn],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/admin", (req, res) => {
  const idbr = req.body.idbr;
  const qur = "DELETE FROM korisnik WHERE id_korisnika = ?";
  pool.query(qur, [idbr], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("Došlo je do greške prilikom brisanja korisnika.");
    }
    console.log("Korisnik uspešno obrisan.");
  });
});

app.get("/trans", (req, res) => {
  const qur = "SELECT * FROM transakcija";
  pool.query(qur, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/akcije", (req, res) => {
  const qur = "SELECT * FROM akcije";
  pool.query(qur, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
}); //Isto slanje podataka ali koriscenjem kolacica

app.get("/admin", (req, res) => {
  pool.query("SELECT * FROM korisnik", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
}); //Slanje podataka preko url

app.get("/meni", (req, res) => {
  pool.query("SELECT * FROM hrana", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const user = req.body.username;
  const sifra = req.body.sifra;

  pool.query(
    "SELECT * FROM korisnik WHERE username = ? AND sifra = ?",
    [user, sifra],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        req.session.user = result;
        console.log(req.session.user);
        res.send(result);
      } else {
        res.send({ message: "Losa kombinacija !" });
      }
    }
  );
}); //Prihvatanje podataka pomocu sesia

app.post("/ocena", (req, res) => {
  const tekst = req.body.tekst;
  const ocena = req.body.ocena;
  const kor = req.body.kor;
  const proi = req.body.proi;
  const qur =
    "INSERT INTO komentar (text,ocena,id_kor,id_pro) VALUES (?,?,?,?)";
  pool.query(qur, [tekst, ocena, kor, proi], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("Došlo je do greške prilikom unosa komentara.");
    }
    console.log("Komentar uspešno dodat.");
  });
});

app.get("/ocena", (req, res) => {
  pool.query("SELECT * FROM komentar", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/korpa", (req, res) => {
  const kroki = req.body.kroki;
  const krokii = req.body.krokii;
  const krokiii = req.body.krokiii;
  const krokiiii = req.body.krokiiii;
  const krokiiiii = req.body.krokiiiii;

  const qur =
    "INSERT INTO korpa (id_artikal,naziv,cena,slika,id_korisnika) VALUES (?,?,?,?,?)";
  pool.query(
    qur,
    [kroki, krokii, krokiii, krokiiiii, krokiiii],
    (err, result) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .send("Došlo je do greške prilikom unosa u korpu.");
      }
      console.log("U korpu uspešno dodato.");
    }
  );
});

app.get("/korpa", (req, res) => {
  pool.query("SELECT * FROM korpa", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/placanje", (req, res) => {
  const kes = req.body.kes;
  const kor = req.body.kor;
  const ukupno = req.body.ukupno;
  const tekst = req.body.tekst;
  const datum = req.body.datum;

  const qur =
    "INSERT INTO transakcija (placanje,cena,id_kor,tekst,datum) VALUES (?,?,?,?,?)";
  pool.query(qur, [kes, ukupno, kor, tekst, datum], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Došlo je do greške prilikom unosa u korpu.");
    }
    console.log("U korpu uspešno dodato.");
  });

  pool.query("DELETE FROM korpa", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/urp", (req, res) => {
  const trans = req.body.trans;
  const pro = req.body.pro;
  const kor = req.body.kor;

  const qur =
    "INSERT INTO sadrzi (id_trans,id_proizvod,id_korisnika) VALUES (?,?,?)";
  pool.query(qur, [trans, pro, kor], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Došlo je do greške prilikom unosa u korpu.");
    }
    console.log("U korpu uspešno dodato.");
  });
});

app.get("/urp", (req, res) => {
  pool.query("SELECT * FROM sadrzi", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Uspesno povezano");
});

app.post("/obrisi_korpa", (req, res) => {
  const idbr = req.body.idbr;
  const qur = "DELETE FROM korpa WHERE  id_artikal= ?";
  pool.query(qur, [idbr], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send("Došlo je do greške prilikom brisanja iz korpe.");
    }
    console.log("Proizvod uspešno obrisan.");
  });
});

app.get("/grafik1", (req, res) => {
  const graf1 = req.query.graf1;
  const qur =
    "SELECT korisnik.naselje,sadrzi.id_korisnika FROM korisnik,sadrzi WHERE korisnik.id_korisnika = sadrzi.id_korisnika AND sadrzi.id_proizvod in (SELECT id_hrane FROM hrana WHERE tip = ?);";
  pool.query(qur, [graf1], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.get("/grafik2", (req, res) => {
  const qur =
    "SELECT sadrzi.id_proizvod,hrana.cena,hrana.tip FROM sadrzi,hrana WHERE sadrzi.id_proizvod = hrana.id_hrane;";
  pool.query(qur, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

app.post("/dodajproizvod", (req, res) => {
  const naziv = req.body.naziv;
  const kategorija = req.body.kategorija;
  const cena = req.body.cena;
  const slika = req.body.slika;

  const qur = "INSERT INTO hrana (naziv,tip,cena,slika) VALUES (?,?,?,?)";
  pool.query(qur, [naziv, kategorija, cena, slika], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Došlo je do greške prilikom unosa hrane.");
    }
    console.log("Uspešno dodato.");
  });
});
app.get("/grafik3", (req, res) => {
  const graf3 = req.query.graf3;
  const qur =
    "SELECT hrana.tip,hrana.cena,sadrzi.id_proizvod FROM hrana,sadrzi WHERE hrana.id_hrane = sadrzi.id_proizvod AND sadrzi.id_korisnika = ?;";
  pool.query(qur, [graf3], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});
