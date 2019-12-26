import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddSupplier from './Supplier/AddSupplier';
import ViewSuppplier from './Supplier/ViewSupplier';

const Supplier = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/supplier/add" component={AddSupplier} />
        <Route exact path="/supplier/" component={ViewSuppplier} />
        <Route exact path="/supplier/view" component={ViewSuppplier} />
      </Switch>
    </div>
  );
};

export default Supplier;
