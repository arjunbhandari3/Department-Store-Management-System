import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import Input from './../../utility/Input';

import { useStateValue } from './../../../contexts/employeeRegister';

import axios from 'axios';

import './../../../sass/CreateOrder.scss';

const CreateOrder = () => {
  const { isEmployeeRegistered } = useStateValue();

  const [customers, setCustomers] = useState([
    { value: 'default', label: 'Choose Customer' }
  ]);
  const [customer_id, setCustomerId] = useState('default');
  const [order_status, setOrderStatus] = useState('Created');
  const [products, setProducts] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [product_id, setProductId] = useState('default');
  const [allVouchers, setAllVouchers] = useState([]);
  const [applicableVouchers, setApplicableVouchers] = useState([]);
  const [voucher_id, setVoucherId] = useState('default');
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [billId, setBillId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  // Order ID
  const [order_id, setOrderId] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products`)
      .then(res => {
        setProducts(res.data.data);
      })
      .then(err => {
        console.log(err);
      });

    axios
      .get(`/api/voucher`)
      .then(res => {
        setAllVouchers(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getTotalOrderedPrice = useCallback(() => {
    return orderedProducts.reduce((accumulator, orderedProduct) => {
      const productId = orderedProduct.product_id;
      const correspondingProduct = products.find(
        element => element.id === parseInt(productId)
      );

      let price =
        parseInt(correspondingProduct.discounted_price) *
        parseInt(orderedProduct.quantity);
      return (accumulator += price);
    }, 0);
  }, [products, orderedProducts]);

  useEffect(() => {
    // Manage applicable vouchers
    // Get price
    const totalPrice = getTotalOrderedPrice();

    let appVouchers = allVouchers.filter(voucher => {
      return parseInt(voucher.minimum_billing_amount) < totalPrice;
    });
    setTotalAmount(totalPrice);
    setApplicableVouchers(appVouchers);

    //
    if (voucher_id === 'default') {
      setDiscountAmount(0);
    } else {
      //
      const correspondingVoucher = applicableVouchers.find(
        element => element.id === parseInt(voucher_id)
      );

      setDiscountAmount(
        (parseInt(correspondingVoucher.discount_rate) *
          getTotalOrderedPrice()) /
          100
      );
    }
  }, [
    orderedProducts,
    getTotalOrderedPrice,
    allVouchers,
    voucher_id,
    applicableVouchers
  ]);

  const onCustomerNameChange = e => {
    setCustomerId(e.value);
  };

  const handleSearchInputChange = text => {
    // On Input Change
    axios
      .get(`/api/customers`, {
        params: {
          nameLikeText: text
        }
      })
      .then(res => {
        let data = res.data.data.map(userData => ({
          value: userData.id,
          label: `${userData.first_name} ${userData.last_name}`
        }));
        setCustomers(data);
      });
  };

  const handleOrderSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/orders`, { order_status, customer_id })
      .then(res => {
        setOrderId(res.data.data.insertId);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleProductChange = e => {
    setProductId(e.target.value);
  };

  const handleOrderedProductsSubmit = e => {
    e.preventDefault();
    axios
      .post(`/api/orderedproducts`, { order_id, product_id, quantity })
      .then(res => {
        let newOrderedProducts = [...orderedProducts, { product_id, quantity }];
        setOrderedProducts(newOrderedProducts);
        setProductId('default');
        setQuantity('');
      });
  };

  const renderTable = () => {
    return orderedProducts.map(orderedProduct => {
      const productId = orderedProduct.product_id;
      const correspondingProduct = products.find(
        element => element.id === parseInt(productId)
      );

      let name = correspondingProduct.product_name;
      let quantity = orderedProduct.quantity;
      let price =
        parseInt(correspondingProduct.discounted_price) *
        parseInt(orderedProduct.quantity);

      return (
        <React.Fragment key={name + quantity + price}>
          <p>{name}</p>
          <p>{quantity}</p>
          <p>Rs. {price} /-</p>
        </React.Fragment>
      );
    });
  };

  const handleSelectedVoucher = e => {
    setVoucherId(e.target.value);
  };

  const handleVoucherAddition = e => {
    e.preventDefault();
  };

  const handleBillSubmission = e => {
    e.preventDefault();

    axios
      .post(`/api/bill`, {
        order_id,
        voucher_id: voucher_id === 'default' ? null : voucher_id,
        bill_status: 'Unpaid'
      })
      .then(res => setBillId(res.data.data.insertId))
      .catch(err => console.log(err));
  };

  const handlePaymentSubmission = e => {
    e.preventDefault();
    axios
      .post(`/api/payment`, {
        customer_id,
        amount_paid: totalAmount - discountAmount,
        payment_time: new Date().toUTCString(),
        payment_method: 'CASH',
        employee_id: isEmployeeRegistered
      })
      .then(res => {
        // Get payment data and store in state;
        setPaymentId(res.data.data.insertId);
        console.log(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleReceiptSubmission = e => {
    e.preventDefault();
    axios
      .post(`/api/receipt`, { billing_id: billId, payment_id: paymentId })
      .then(res => {
        alert('Receipt Generated');
      })
      .catch(err => {
        alert('Error Occurred');
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Create Order</h1>
      <form onSubmit={handleOrderSubmit}>
        <div className="form-group">
          <label className="form-group__label">Select Customer</label>
          <Select
            isDisabled={order_id ? true : false}
            onInputChange={handleSearchInputChange}
            onChange={onCustomerNameChange}
            options={customers}
          />
        </div>
        <Input
          isDisabled={order_id ? true : false}
          label="Order Status"
          value={order_status}
          setValue={setOrderStatus}
          placeholder="Enter Order Status"
        />
        {order_id ? (
          <hr
            style={{
              marginTop: 20,
              border: 'none',
              borderTop: '1px solid #f0f0f0'
            }}
          />
        ) : (
          <button className="btn">Create Order</button>
        )}
      </form>
      <h1 className="main-heading">Add Products To Order</h1>
      <form onSubmit={handleOrderedProductsSubmit}>
        <Input
          isDisabled={order_id ? false : true}
          type="number"
          value={quantity}
          label="Enter Quantity"
          placeholder="Enter Quantity"
          setValue={setQuantity}
        />
        <div className="form-group">
          <label className="form-group__label" htmlFor="choose_product">
            Choose Product
          </label>
          <select
            className="form-group__input"
            disabled={order_id ? false : true}
            value={product_id}
            onChange={handleProductChange}
            name="choose_product"
            id="choose_product"
          >
            <option value="default">Choose Product</option>
            {products.map(product => (
              <option value={product.id} key={product.id}>
                {product.product_name}
              </option>
            ))}
          </select>
        </div>
        <button disabled={order_id ? false : true} className="btn">
          Add This Product To Order
        </button>

        <hr
          style={{
            marginTop: 20,
            border: 'none',
            borderTop: '1px solid #f0f0f0'
          }}
        />
      </form>
      <h1 className="main-heading">Current Products in Order</h1>
      <div className="orderedProducts">
        <p className="orderedProducts__header">Name</p>
        <p className="orderedProducts__header">Quantity</p>
        <p className="orderedProducts__header">Price</p>
        {renderTable()}
        <p>Total Price : Rs. {totalAmount}/-</p>
      </div>

      {orderedProducts.length > 0 && (
        <React.Fragment>
          <h1 className="main-heading">Add Voucher</h1>
          <form onSubmit={handleVoucherAddition}>
            <div className="form-group">
              <label className="form-group__label">Select Voucher</label>
              <select value={voucher_id} onChange={handleSelectedVoucher}>
                <option disabled={true} value="default">
                  Select Vouchers
                </option>
                {applicableVouchers.map(applicableVoucher => (
                  <option
                    value={applicableVoucher.id}
                    key={applicableVoucher.id + applicableVoucher.discount_rate}
                  >
                    {applicableVoucher.id} - Discount -{' '}
                    {applicableVoucher.discount_rate}%
                  </option>
                ))}
              </select>
            </div>
          </form>

          <h1 className="main-heading">Bill Status</h1>
          <form onSubmit={handleBillSubmission}>
            <p style={{ fontSize: '1.5rem' }}>
              Discount After Applying Voucher : Rs. {discountAmount}/-
            </p>
            <p style={{ fontSize: '1.5rem', marginBottom: 16 }}>
              Total Payable Amount : Rs. {totalAmount - discountAmount}/-
            </p>
            <button className="btn">Generate Bill</button>
          </form>
        </React.Fragment>
      )}
      {billId && (
        <React.Fragment>
          <h1 className="main-heading">Proceed to Payment</h1>
          <form onSubmit={handlePaymentSubmission}>
            <button className="btn">Complete Payment</button>
          </form>
        </React.Fragment>
      )}
      {paymentId && (
        <React.Fragment>
          <h1 className="main-heading">Proceed to Receipt</h1>
          <form onSubmit={handleReceiptSubmission}>
            <button className="btn">Generate Receipt</button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
};

export default CreateOrder;
