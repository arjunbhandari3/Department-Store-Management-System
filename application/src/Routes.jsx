import React, { useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { useStateValue } from './contexts/employeeRegister';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Product from './components/pages/Product';
import Customer from './components/pages/Customer';
import Employee from './components/pages/Employee';
import Supplier from './components/pages/Supplier';
import Voucher from './components/pages/Voucher';
import Orders from './components/pages/Orders';
import Warranty from './components/pages/Warranty';

const Routes = props => {
  const authValue = useStateValue();

  useEffect(() => {
    if (!authValue.isEmployeeRegistered) {
      props.history.push('/login');
    }
  }, [authValue, props.history]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route path="/product" component={Product} />
      <Route path="/customer" component={Customer} />
      <Route path="/employee" component={Employee} />
      <Route path="/supplier" component={Supplier} />
      <Route path="/voucher" component={Voucher} />
      <Route path="/order" component={Orders} />
      <Route path="/warranty" component={Warranty} />
    </Switch>
  );
};

export default withRouter(Routes);
