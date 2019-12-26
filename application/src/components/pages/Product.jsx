import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddProduct from './Product/AddProduct';
import ViewProduct from './Product/ViewProduct';
import AddProductCategory from './Product/AddProductCategory';

const Product = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/product/add" component={AddProduct} />
        <Route exact path="/product/view" component={ViewProduct} />
        <Route exact path="/product" component={ViewProduct} />
        <Route exact path="/product/category" component={AddProductCategory} />
      </Switch>
    </div>
  );
};

export default Product;
