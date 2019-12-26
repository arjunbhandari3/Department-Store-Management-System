import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewCustomer = props => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/customers?nameLikeText=`)
      .then(res => {
        setCustomers(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add-customer">
      <h1 className="main-heading">Customers</h1>
      <div className="products">
        {customers.map(customer => (
          <div className="product">
            <h2 className="product__name">
              {customer.first_name + ' ' + customer.last_name}
            </h2>
            <p>Email : {customer.email}</p>
            <p>Residential Address : {customer.residential_address}</p>
            <p>Phone Number : {customer.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCustomer;
