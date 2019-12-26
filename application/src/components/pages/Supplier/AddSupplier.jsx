import React, { useState } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddSupplier = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [office_address, setOfficeAddress] = useState('');
  const [phone_number, setPhoneNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/suppliers`, {
        email,
        name,
        office_address,
        phone_number
      })
      .then(() => {
        alert('Supplier Added Successfully');
        setEmail('');
        setName('');
        setOfficeAddress('');
        setPhoneNumber('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Supplier</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="Enter email..."
          name="email"
          value={email}
          setValue={setEmail}
        />
        <Input
          label="Name"
          placeholder="Enter Name..."
          name="name"
          value={name}
          setValue={setName}
        />
        <Input
          label="Phone Number"
          placeholder="Enter Phone Number..."
          name="phone_number"
          value={phone_number}
          setValue={setPhoneNumber}
        />
        <Input
          label="Office Address"
          placeholder="Enter Office Address..."
          name="office_address"
          value={office_address}
          setValue={setOfficeAddress}
        />
        <button className="btn btn--submit">Add Supplier</button>
      </form>
    </div>
  );
};

export default AddSupplier;
