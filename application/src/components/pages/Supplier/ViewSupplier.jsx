import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewSupplier = props => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/suppliers`)
      .then(res => {
        setSuppliers(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add-customer">
      <h1 className="main-heading">Suppliers</h1>
      <div className="products">
        {suppliers.map(supplier => (
          <div className="product">
            <h2 className="product__name">{supplier.name}</h2>
            <p>Email : {supplier.email}</p>
            <p>Official Address : {supplier.office_address}</p>
            <p>Phone Number : {supplier.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSupplier;
