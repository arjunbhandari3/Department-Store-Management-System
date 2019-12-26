import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProduct = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then(res => {
        setProducts(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="add-customer">
      <h1 className="main-heading">Products Available</h1>
      <div className="products">
        {products.map(product => (
          <div className="product">
            <h2 className="product__name">{product.product_name}</h2>
            <p>Available Quantities : {product.available_quantities}</p>
            <p>Price : {product.price}</p>
            <p>Discounted Price : {product.discounted_price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
