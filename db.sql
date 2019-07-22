DROP DATABASE IF EXISTS department_store;
CREATE DATABASE department_store;
USE department_store;

CREATE TABLE employee_types (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    post VARCHAR(50),
    working_hour INT,
    monthly_salary INT
);
CREATE TABLE employee_info (
    email VARCHAR(50) PRIMARY KEY,
    phone_number INT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    residential_address VARCHAR(100)
);
CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    email VARCHAR(50),
    employee_type_id INT,
    FOREIGN KEY(employee_type_id) REFERENCES employee_types(id),
    FOREIGN KEY(email) REFERENCES employee_info(email),
    PRIMARY KEY(id, email)
);
CREATE TABLE customer_info (
    email VARCHAR(50) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone_number INT,
    residential_address VARCHAR(100)
);
CREATE TABLE customers (
    id INT AUTO_INCREMENT,
    email VARCHAR(50),
    PRIMARY KEY (id, email),
    FOREIGN KEY(email) REFERENCES customer_info(email)
);
CREATE TABLE supplier_info (
    email VARCHAR(50) PRIMARY KEY,
    name VARCHAR(50),
    office_address VARCHAR(100),
    phone_number VARCHAR(14)
);
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT,
    email VARCHAR(50),
    PRIMARY KEY(id, email),
    FOREIGN KEY(email) REFERENCES supplier_info(email)
);
CREATE TABLE product_category (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    category VARCHAR(100)
);
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    product_name VARCHAR(50),
    product_category_id INT,
    available_quantities INT,
    price INT,
    discounted_price INT,
    supplier_id INT,
    date_of_expire DATE,
    minimum_age_required INT,
    FOREIGN KEY(product_category_id) REFERENCES product_category(id),
    FOREIGN KEY(supplier_id) REFERENCES suppliers(id)
);
CREATE TABLE reviews (
    customer_id INT,
    product_id INT,
    review_percentage DECIMAL(5, 2),
    review_description VARCHAR(255),
    reviewed_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(customer_id) REFERENCES customers(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_status VARCHAR(50),
    ordered_date TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);
CREATE TABLE ordered_products (
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY(order_id) REFERENCES orders(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);
CREATE TABLE voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dicount_rate DECIMAL(5, 2),
    minimum_billing_amount DECIMAL(30, 5)
);
CREATE TABLE discount (
    id INT AUTO_INCREMENT PRIMARY KEY,
    voucher_id INT,
    customer_id INT,
    FOREIGN KEY(voucher_id) REFERENCES voucher(id),
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);
CREATE TABLE bills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    voucher_id INT,
    bill_status VARCHAR(50) DEFAULT 'Not Paid',
    FOREIGN KEY(voucher_id) REFERENCES voucher(id),
    FOREIGN KEY(order_id) REFERENCES orders(id)
);
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    payment_method VARCHAR(100),
    payment_time TIMESTAMP DEFAULT NOW(),
    amount_paid DECIMAL(30, 5),
    customer_id INT,
    FOREIGN KEY(employee_id) REFERENCES employees(id),
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);
CREATE TABLE receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    billing_id INT,
    payment_id INT,
    FOREIGN KEY(billing_id) REFERENCES bills(id),
    FOREIGN KEY(payment_id) REFERENCES payments(id)
);
CREATE TABLE warrenties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    warranty_start DATE,
    warranty_end DATE,
    product_id INT,
    bill_id INT,
    FOREIGN KEY(product_id) REFERENCES products(id),
    FOREIGN KEY(bill_id) REFERENCES bills(id)
);