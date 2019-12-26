import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddEmployee = props => {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [residential_address, setResidentialAddress] = useState('');
  const [employee_type_id, setEmployeeTypeId] = useState('default');

  useEffect(() => {
    axios
      .get(`/api/employeestype`)
      .then(res => {
        setEmployeeTypes(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/employees`, {
        email,
        employee_type_id,
        first_name,
        last_name,
        phone_number,
        residential_address
      })
      .then(res => {
        alert('Employee Added Successfully');
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setResidentialAddress('');
        setEmployeeTypeId('default');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleEmployeeTypeChange = e => {
    setEmployeeTypeId(e.target.value);
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Employee</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="Enter email..."
          name="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          label="First Name"
          placeholder="Enter First Name..."
          name="first_name"
          value={first_name}
          setValue={setFirstName}
        />
        <Input
          label="Last Name"
          placeholder="Enter Last Name..."
          name="last_name"
          value={last_name}
          setValue={setLastName}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Phone Number..."
          name="phone_number"
          value={phone_number}
          setValue={setPhoneNumber}
        />
        <Input
          label="Residential Address"
          placeholder="Enter Residential Address..."
          name="residential_address"
          value={residential_address}
          setValue={setResidentialAddress}
        />
        <div className="form-group">
          <label htmlFor="employeeType" className="form-group__label">
            Select Employee Type
          </label>
          <select
            className="form-group__input"
            value={employee_type_id}
            onChange={handleEmployeeTypeChange}
          >
            <option
              className="form-group__option"
              disabled={true}
              value="default"
            >
              Select Employee Type
            </option>
            {employeeTypes.map(employeeType => (
              <option
                className="form-group__option"
                key={employeeType.id}
                value={employeeType.id}
              >
                {employeeType.post}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn--submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
