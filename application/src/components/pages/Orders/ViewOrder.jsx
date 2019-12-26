import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewOrder = props => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/orders`)
      .then(res => {
        setOrders(res.data.data);
      })
      .then(err => {
        console.log(err);
      });
  }, []);
  console.log(orders);
  return (
    <div className="add-customer">
      <h1 className="main-heading">Orders</h1>
      <div className="products">
        {orders.map(order => (
          <div className="product">
            <h2 className="product__name">Order Id : {order.id}</h2>
            <p>Order Status: {order.order_status}</p>
            <p>Ordered Date : {new Date(order.ordered_date).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrder;
