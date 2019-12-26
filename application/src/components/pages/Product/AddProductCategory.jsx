import React, { useState } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const ProductCategory = () => {
  const [category, setCategory] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/productscategory`, { category })
      .then(() => {
        alert('Product Category Successfully');
        setCategory('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Product Category</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Product Category"
          placeholder="Enter Product Category..."
          name="product_category"
          value={category}
          setValue={setCategory}
        />
        <button className="btn btn--submit">Add Product Category</button>
      </form>
    </div>
  );
};

export default ProductCategory;
