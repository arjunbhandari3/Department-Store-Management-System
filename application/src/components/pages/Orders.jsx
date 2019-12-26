import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateOrder from './Orders/CreateOrder';
import ViewOrder from './Orders/ViewOrder';

const Orders = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/order/create" component={CreateOrder} />
        <Route exact path="/order/" component={CreateOrder} />
        <Route exact path="/order/view" component={ViewOrder} />
      </Switch>
    </div>
  );
};

export default Orders;
