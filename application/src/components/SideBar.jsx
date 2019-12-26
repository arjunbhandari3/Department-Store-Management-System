import React from 'react';
import { Link } from 'react-router-dom';
import './../sass/SideBar.scss';

import { useStateValue } from './../contexts/employeeRegister';

const SideBar = () => {
  const authValue = useStateValue();

  if (authValue.isEmployeeRegistered) {
    return (
      <div className="side-bar">
        <div className="side-bar__header">
          <p>Admin Panel</p>
        </div>
        <div className="side-bar__links">
          <Link className="side-bar__link" to="/product">
            Product
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/product/add">
              Add Product
            </Link>
            <Link className="side-bar__sub-link" to="/product/view">
              View Products
            </Link>
            <Link className="side-bar__sub-link" to="/product/category">
              Product Category
            </Link>
          </div>

          <Link className="side-bar__link" to="/customer">
            Customer
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/customer/add">
              Add Customer
            </Link>
            <Link className="side-bar__sub-link" to="/customer/view">
              View Customer
            </Link>
          </div>

          <Link className="side-bar__link" to="/employee">
            Employee
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/employee/add">
              Add Employee
            </Link>
            <Link className="side-bar__sub-link" to="/employee/view">
              View Employee
            </Link>
            <Link className="side-bar__sub-link" to="/employee/type">
              Add Employee Type
            </Link>
          </div>

          <Link className="side-bar__link" to="/employee">
            Supplier
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/supplier/add">
              Add Supplier
            </Link>
            <Link className="side-bar__sub-link" to="/supplier/view">
              View Supplier
            </Link>
          </div>

          <Link className="side-bar__link" to="/voucher">
            Voucher
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/voucher/add">
              Add New Voucher
            </Link>
            <Link className="side-bar__sub-link" to="/voucher/view">
              View Voucher
            </Link>
          </div>

          <Link className="side-bar__link" to="/order">
            Order
          </Link>
          <div className="side-bar__sub-links">
            <Link className="side-bar__sub-link" to="/order/create">
              Fulfill Customer Order
            </Link>
            <Link className="side-bar__sub-link" to="/order/view">
              View Orders
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="side-bar">
        <div className="side-bar__header">
          <p>Admin Panel</p>
        </div>
        <div className="side-bar__login">Login &rarr;</div>
      </div>
    );
  }
};

export default SideBar;
