const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.SQL_PASSWORD,
  database: process.env.DATABASE,
});

app.post("/addpassword", (req, res) => {
  const { password, application } = req.body;

  db.query(
    "INSERT INTO Passwords (pass, app) VALUES (?,?)",
    [password, application],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Password Saved!");
      }
    }
  );
});

app.get("/getpasswords", (req, res) => {
  db.query("SELECT * FROM Passwords;", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello Fren.");
});

app.listen(PORT, () => console.log(`You are LIVE on http://localhost:${PORT}`));
