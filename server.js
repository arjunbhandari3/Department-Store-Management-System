const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const routes = require("./routes/index");

const app = express();

// Middleware
app.use(express.json());

const port = 5000;
app.use(cors());

pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: "",
  database: "department_store",
  supportBigNumbers: true,
  bigNumberStrings: true,
});

app.get("/", (req, res) => {
  res.send("Welcome to API Server of Department Store Management System");
});

app.use("/api/", routes);

app.listen(port, () => {
  console.log(`Server is listening in port ${port}`);
});
