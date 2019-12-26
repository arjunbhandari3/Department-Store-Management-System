import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddWarranty from './Warranty/AddWarranty';

const Warranty = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/warranty/add" component={AddWarranty} />
        <Route exact path="/warranty/" component={AddWarranty} />
      </Switch>
    </div>
  );
};

export default Warranty;
