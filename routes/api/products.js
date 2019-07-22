const router = require("express").Router();
// Get All Products
router.get("/products", async (req, res) => {
    try {
        pool.query('SELECT products.* FROM products ORDER BY products.id', function (error, results, fields) {
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
router.post("/products", async (req, res) => {
    try {
        let {
            product_name,
            product_category_id,
            available_quantities,
            price,
            discounted_price,
            supplier_id,
            date_of_expire,
            minimum_age_required
        } = req.body;
        pool.query("INSERT INTO products(product_name,product_category_id,available_quantities,price,discounted_price,supplier_id,date_of_expire,minimum_age_required) VALUES(?,?,?,?,?,?,?,?)", [product_name, product_category_id, available_quantities, price, discounted_price, supplier_id, date_of_expire, minimum_age_required], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New products has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

// Get All Products Cateogory
router.get("/productscategory", async (req, res) => {
    try {
        pool.query('SELECT * FROM product_category', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'products category list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})
// Add product
router.post("/productscategory", async (req, res) => {
    try {
        let {
            category
        } = req.body;
        pool.query("INSERT INTO product_category(category) VALUES(?)", [category], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New product category has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

module.exports = router;