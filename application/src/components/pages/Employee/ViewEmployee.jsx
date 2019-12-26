import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewEmployee = props => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/employees`)
      .then(res => {
        setEmployees(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add-customer">
      <h1 className="main-heading">Employees</h1>
      <div className="products">
        {employees.map(employee => (
          <div className="product">
            <h2 className="product__name">
              {employee.first_name + ' ' + employee.last_name}
            </h2>
            <p>Email : {employee.email}</p>
            <p>Residential Address : {employee.residential_address}</p>
            <p>Phone Number : {employee.phone_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployee;
