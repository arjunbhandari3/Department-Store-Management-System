const router = require("express").Router();
// Get All Employees
router.get("/employees", async (req, res) => {
	try {
		pool.query('SELECT employees.id,employees.email,employee_info.*,employee_types.* FROM employees INNER JOIN employee_info ON employees.email = employee_info.email INNER JOIN employee_types ON employees.employee_type_id = employee_types.id ORDER BY employees.id', function (error, results, fields) {
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
router.post("/employees", async (req, res) => {
	try {
		let {
			email,
			phone_number,
			first_name,
			last_name,
			residential_address,
			employee_type_id
		} = req.body;

		pool.query("INSERT INTO employee_info(email, phone_number, first_name, last_name, residential_address) VALUES(?,?,?,?,?);", [email, phone_number, first_name, last_name, residential_address], function (error, results, fields) {
			if (error) throw error;
			pool.query("INSERT INTO employees(email, employee_type_id) VALUES(?,?);", [email, employee_type_id], function (error, results, fields) {
				if (error) throw error;
				return res.send({
					error: false,
					data: results,
					message: 'New employee has been created successfully.'
				});
			})
		});
	} catch (err) {
		res.status(400).send(err);
		console.log(err)
	}
});

//Get employee types
router.get("/employeestype", async (req, res) => {
	try {
		pool.query('SELECT * FROM employee_types', function (error, results, fields) {
			if (error) throw error;
			return res.send({
				error: false,
				data: results,
				message: 'employees types list.'
			});
		});
	} catch (err) {
		res.send(err.statusCode).json({
			message: err
		});
	}
})

//Add employee type
router.post("/employeetype", async (req, res) => {
	try {
		let {
			post,
			working_hour,
			monthly_salary
		} = req.body;
		pool.query("INSERT INTO employee_types(post,working_hour,monthly_salary) VALUES(?,?,?)", [post, working_hour, monthly_salary], function (error, results, fields) {
			if (error) throw error;
			return res.send({
				error: false,
				data: results,
				message: 'New customer has been created successfully.'
			});
		})
	} catch (err) {
		res.status(400).send(err);
		console.log(err)
	}
});
module.exports = router;