import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddProduct = props => {
  const [productCategories, setProductCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [product_name, setProductName] = useState('');
  const [available_quantities, setAvailableQuantities] = useState(0);
  const [price, setPrice] = useState(0);
  const [discounted_price, setDiscountedPrice] = useState(0);
  const [supplier_id, setSupplierId] = useState('default');
  const [date_of_expire, setDateOfExpire] = useState('');
  const [minimum_age_required, setMinimumAgeRequired] = useState(3);
  const [product_category_id, setProductCategoryId] = useState('default');

  useEffect(() => {
    axios
      .get(`/api/productscategory`)
      .then(res => {
        setProductCategories(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get(`/api/suppliers`)
      .then(res => {
        setSuppliers(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/products`, {
        product_name,
        product_category_id,
        available_quantities,
        price,
        discounted_price,
        supplier_id,
        date_of_expire,
        minimum_age_required
      })
      .then(res => {
        alert('Product Added Successfully');
        setProductName('');
        setProductCategoryId('default');
        setAvailableQuantities(0);
        setPrice(0);
        setDiscountedPrice(0);
        setSupplierId('default');
        setDateOfExpire('');
        setMinimumAgeRequired(3);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProductCategoryChange = e => {
    setProductCategoryId(e.target.value);
  };

  const handleSupplierChange = e => {
    setSupplierId(e.target.value);
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Product</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Product Name"
          placeholder="Enter Product Name..."
          name="product_name"
          value={product_name}
          setValue={setProductName}
        />

        <div className="form-group">
          <label htmlFor="product-category" className="form-group__label">
            Select Product Category
          </label>
          <select
            className="form-group__input"
            value={product_category_id}
            onChange={handleProductCategoryChange}
          >
            <option
              className="form-group__option"
              disabled={true}
              value="default"
            >
              Select Product Category Type
            </option>
            {productCategories.map(productType => (
              <option
                className="form-group__option"
                key={productType.id}
                value={productType.id}
              >
                {productType.category}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="number"
          label="Available Quantities"
          placeholder="Enter Available Quantities..."
          name="available-quantities"
          value={available_quantities}
          setValue={setAvailableQuantities}
        />

        <Input
          type="number"
          label="Price"
          placeholder="Enter Price..."
          name="price"
          value={price}
          setValue={setPrice}
        />

        <Input
          type="number"
          label="Discounted Price"
          placeholder="Enter Discounted Price..."
          name="discounted_price"
          value={discounted_price}
          setValue={setDiscountedPrice}
        />

        <div className="form-group">
          <label htmlFor="product-category" className="form-group__label">
            Select Product Supplier
          </label>
          <select
            className="form-group__input"
            value={supplier_id}
            onChange={handleSupplierChange}
          >
            <option
              className="form-group__option"
              disabled={true}
              value="default"
            >
              Select Product Supplier
            </option>
            {suppliers.map(supplier => (
              <option
                className="form-group__option"
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          type="date"
          label="Expiry Date"
          placeholder="Enter Expiry Date..."
          name="date_of_expire"
          value={date_of_expire}
          setValue={setDateOfExpire}
        />

        <Input
          type="number"
          label="Minimum Age Required"
          placeholder="Enter Expiry Date..."
          name="minimum_age"
          value={minimum_age_required}
          setValue={setMinimumAgeRequired}
        />

        <button className="btn btn--submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
