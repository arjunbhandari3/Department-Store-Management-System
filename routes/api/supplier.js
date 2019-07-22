const router = require("express").Router();
// Get All Supplier
router.get("/suppliers", async (req, res) => {
    try {
        pool.query('SELECT suppliers.id,suppliers.email,supplier_info.* FROM suppliers INNER JOIN supplier_info ON suppliers.email = supplier_info.email ORDER BY suppliers.id', function (error, results, fields) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'suppliers list.'
            });
        });
    } catch (err) {
        res.send(err.statusCode).json({
            message: err
        });
    }
})

// Add supplier
router.post("/suppliers", async (req, res) => {
    try {
        let {
            email,
            phone_number,
            name,
            office_address
        } = req.body;
        pool.query("INSERT INTO supplier_info(email, phone_number, name, office_address) VALUES(?,?,?,?);", [email, phone_number, name, office_address], function (error, results, fields) {
            if (error) throw error;
            pool.query("INSERT INTO suppliers(email) VALUES(?);", [email], function (error, results, fields) {
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