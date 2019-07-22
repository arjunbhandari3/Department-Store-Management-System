const router = require("express").Router();
// Get All Products
router.get("/reviews", async (req, res) => {
    try {
        pool.query('SELECT reviews.*,customers.id,products.id FROM reviews INNER JOIN customers ON reviews.customer_id = customers.id INNER JOIN products ON reviews.product_id = products.id ORDER BY reviews.reviewed_date', function (error, results, fields) {
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

// Add product
router.post("/reviews", async (req, res) => {
    try {
        let {
            customer_id,
            product_id,
            review_percentage,
            review_description,
            reviewed_date
        } = req.body;
        pool.query("INSERT INTO reviews(customer_id,product_id,review_percentage,review_description,reviewed_date) VALUES(?,?,?,?,?)", [customer_id, product_id, review_percentage, review_description, reviewed_date], function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New reviews has been created successfully.'
            });
        })
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});

module.exports = router;