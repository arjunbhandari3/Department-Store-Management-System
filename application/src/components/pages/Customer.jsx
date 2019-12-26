import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddCustomer from './Customer/AddCustomer';
import ViewCustomer from './Customer/ViewCustomer';

const Customer = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/customer/add" component={AddCustomer} />
        <Route exact path="/customer/" component={ViewCustomer} />
        <Route exact path="/customer/view" component={ViewCustomer} />
      </Switch>
    </div>
  );
};

export default Customer;
