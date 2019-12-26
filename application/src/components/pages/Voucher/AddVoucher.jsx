import React, { useState } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddVoucher = () => {
  const [discount_rate, setDiscountRate] = useState('');
  const [minimum_billing_amount, setMinimumBillingAmount] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/voucher`, { discount_rate, minimum_billing_amount })
      .then(() => {
        alert('Product Category Successfully');
        setDiscountRate('');
        setMinimumBillingAmount('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Voucher</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Discount Rate"
          placeholder="Enter Discount Rate..."
          name="product_category"
          value={discount_rate}
          setValue={setDiscountRate}
        />
        <Input
          type="number"
          label="Minimum Billing Amount"
          placeholder="Enter Discount Rate..."
          name="product_category"
          value={minimum_billing_amount}
          setValue={setMinimumBillingAmount}
        />
        <button className="btn btn--submit">Add Voucher</button>
      </form>
    </div>
  );
};

export default AddVoucher;
