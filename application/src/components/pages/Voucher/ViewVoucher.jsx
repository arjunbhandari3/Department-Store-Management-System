import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewVoucher = props => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/voucher`)
      .then(res => {
        setVouchers(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add-customer">
      <h1 className="main-heading">Vouchers</h1>
      <div className="products">
        {vouchers.map(voucher => (
          <div className="product">
            <h2 className="product__name">{voucher.id}</h2>
            <p>Discount Rate : {voucher.discount_rate}%</p>
            <p>Minimum Billing Amount : {voucher.minimum_billing_amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewVoucher;
