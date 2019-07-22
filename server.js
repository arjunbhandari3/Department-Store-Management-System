const express = require("express");
const app = express();

// Middleware
app.use(express.json());
var http = require('http');
var cors = require('cors');
var mysql = require('mysql');
const port = 3000;
app.use(cors());

pool = mysql.createPool({
	connectionLimit: 100,
	host: "localhost",
	user: "root",
	password: "",
	database: "department_store",
	supportBigNumbers: true,
	bigNumberStrings: true
});

app.get("/", (req, res) => {
	res.send("Welcome to API Server of Department Store Management System");
});

const employeeRoute = require('./routes/api/employee');
app.use("/api/", employeeRoute);

const customerRoute = require('./routes/api/customer');
app.use("/api/", customerRoute);

const supplierRoute = require('./routes/api/supplier');
app.use("/api/", supplierRoute);

const productsRoute = require('./routes/api/products');
app.use("/api/", productsRoute);

const ordersRoute = require('./routes/api/orders');
app.use("/api/", ordersRoute);

const reviewsRoute = require('./routes/api/reviews');
app.use("/api/", reviewsRoute);

const billingsRoute = require('./routes/api/billings');
app.use("/api/", billingsRoute);

app.listen(port, () => {
	console.log(`Server is listening in port ${port}`);
});