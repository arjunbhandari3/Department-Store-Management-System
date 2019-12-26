import React, { useState } from 'react';
import axios from 'axios';
import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddCustomer = props => {
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [residential_address, setResidentialAddress] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/customers`, {
        email,
        first_name,
        last_name,
        phone_number,
        residential_address
      })
      .then(res => {
        alert('Customer Info Added Successfully');
        setEmail('');
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setResidentialAddress('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Customer</h1>
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
        <button className="btn btn--submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomer;
