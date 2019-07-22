const router = require("express").Router();
// Get All Customers
router.get("/customers", async (req, res) => {
    const {
        nameLikeText
    } = req.query;
    try {
        pool.query(`SELECT customers.id,customers.email,customer_info.* FROM customers INNER JOIN customer_info ON customers.email = customer_info.email WHERE customer_info.first_name LIKE '%${nameLikeText}%' OR customer_info.last_name LIKE '%${nameLikeText}%'`, function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'customers list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})
// Add customer
router.post("/customers", async (req, res) => {
    try {
        let {
            email,
            phone_number,
            first_name,
            last_name,
            residential_address
        } = req.body;

        pool.query("INSERT INTO customer_info(email, phone_number, first_name, last_name, residential_address) VALUES(?,?,?,?,?);", [email, phone_number, first_name, last_name, residential_address], function (error, results, fields) {
            if (error) throw error;
            pool.query("INSERT INTO customers(email) VALUES(?);", [email], function (error, results, fields) {
                if (error) throw error;
                return res.send({
                    error: false,
                    data: results,
                    message: 'New customer has been created successfully.'
                });
            })
        });
    } catch (err) {
        res.status(400).send(err);
        console.log(err)
    }
});
module.exports = router;