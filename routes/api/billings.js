const router = require("express").Router();
// Get All Products
router.get("/voucher", async (req, res) => {
    try {
        pool.query('SELECT voucher.* FROM voucher', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'reviews list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
});

router.post("/voucher", async (req, res) => {
    try {
        let {
            discount_rate,
            minimum_billing_amount
        } = req.body;
        pool.query("INSERT INTO voucher(discount_rate,minimum_billing_amount) VALUES(?,?)", [discount_rate, minimum_billing_amount], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New voucher has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

// get bills
router.get("/bill", async (req, res) => {
    try {
        pool.query('SELECT bills.* FROM bills', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'bills list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
});

// Add product
router.post("/bill", async (req, res) => {
    try {
        let {
            order_id,
            voucher_id,
            bill_status
        } = req.body;
        pool.query("INSERT INTO bills(order_id,voucher_id,bill_status) VALUES(?,?,?)", [order_id, voucher_id, bill_status], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New bill has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

//payments
router.get("/payment", async (req, res) => {
    try {
        pool.query('SELECT payments.*,employees.id,customers.id FROM payments INNER JOIN employees ON payments.employee_id = employees.id INNER JOIN customers ON payments.customer_id = customers.id ORDER BY payments.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'employees list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})
// Add employee
router.post("/payment", async (req, res) => {
    try {
        let {
            employee_id,
            payment_method,
            payment_time,
            amount_paid,
            customer_id
        } = req.body;

        pool.query("INSERT INTO payments(employee_id,payment_method,payment_time,amount_paid,customer_id) VALUES( ? , ? , ? , ? , ? )", [employee_id, payment_method, payment_time, amount_paid, customer_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New employee has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});
// get receipts

router.get("/receipt", async (req, res) => {
    try {
        pool.query('SELECT receipts.*,bills.id,payments.id FROM receipts INNER JOIN bills ON receipts.billing_id = bills.id INNER JOIN payments ON receipts.payment_id = payments.id ORDER BY receipts.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'receipts list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})
// Add receipt
router.post("/receipt", async (req, res) => {
    try {
        let {
            billing_id,
            payment_id
        } = req.body;

        pool.query("INSERT INTO receipts(billing_id,payment_id) VALUES( ? , ?)", [billing_id, payment_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New employee has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

// get warrenty

router.get("/warrenty", async (req, res) => {
    try {
        pool.query('SELECT warrenties.*,bills.id,products.id FROM warrenties INNER JOIN bills ON warrenties.bill_id = bills.id INNER JOIN products ON warrenties.product_id = products.id ORDER BY warrenties.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'warrenties list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})
// Add warrenty
router.post("/warrenty", async (req, res) => {
    try {
        let {
            warranty_start,
            warranty_end,
            product_id,
            bill_id
        } = req.body;

        pool.query("INSERT INTO warrenties(warranty_start,warranty_end,product_id,bill_id) VALUES( ?,?,?,?)", [warranty_start, warranty_end, product_id, bill_id], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New employee has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});
module.exports = router;