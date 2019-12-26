import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddVoucher from './Voucher/AddVoucher';
import ViewVoucher from './Voucher/ViewVoucher';

const Voucher = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/voucher/add" component={AddVoucher} />
        <Route exact path="/voucher/" component={ViewVoucher} />
        <Route exact path="/voucher/view" component={ViewVoucher} />
      </Switch>
    </div>
  );
};

export default Voucher;
