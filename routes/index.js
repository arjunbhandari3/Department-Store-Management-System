const router = require("express").Router();

const employeeRoute = require("./api/employee");
const customerRoute = require("./api/customer");
const supplierRoute = require("./api/supplier");
const productsRoute = require("./api/products");
const ordersRoute = require("./api/orders");
const reviewsRoute = require("./api/reviews");
const billingsRoute = require("./api/billings");

router.use("/", employeeRoute);
router.use("/", customerRoute);
router.use("/", supplierRoute);
router.use("/", productsRoute);
router.use("/", ordersRoute);
router.use("/", reviewsRoute);
router.use("/", billingsRoute);

module.exports = router;
