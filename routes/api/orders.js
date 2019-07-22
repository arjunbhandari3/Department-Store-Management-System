const router = require("express").Router();
// Get All Products
router.get("/orders", async (req, res) => {
    try {
        pool.query('SELECT orders.* FROM orders', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'products list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
});

// Add product
router.post("/orders", async (req, res) => {
    try {
        let {
            customer_id,
            order_status,
        } = req.body;
        pool.query("INSERT INTO orders(customer_id,order_status) VALUES(?,?)", [customer_id, order_status], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                fields: fields,
                message: 'New products has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

// Get All Products Cateogory
router.get("/orderedproducts", async (req, res) => {
    try {
        pool.query('SELECT ordered_products.*,orders.order_id FROM ordered_products INNER JOIN orders ON ordered_productsorder_id = orders.id ORDER BY ordered_products.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'products list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
});
// Add product
router.post("/orderedproducts", async (req, res) => {
    try {
        let {
            order_id,
            product_id,
            quantity,
        } = req.body;
        pool.query("INSERT INTO ordered_products(order_id,product_id,quantity) VALUES(?,?,?)", [order_id, product_id, quantity], function (error, results, fields) {
            if (error) throw error;
            pool.query(`UPDATE products SET available_quantities=available_quantities-'${quantity}' WHERE id = '${product_id}'`, function (error, results, fields) {
                if (error) throw error;
                return res.send({
                    error: false,
                    data: results,
                    fields: fields,
                    message: 'New products has been created successfully.'
                });
            })
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

module.exports = router;