import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddEmployee from './Employee/AddEmployee';
import ViewEmployee from './Employee/ViewEmployee';
import AddEmployeeType from './Employee/AddEmployeeType';

const Employee = props => {
  return (
    <div>
      <Switch>
        <Route exact path="/employee/add" component={AddEmployee} />
        <Route exact path="/employee/" component={ViewEmployee} />
        <Route exact path="/employee/view" component={ViewEmployee} />
        <Route exact path="/employee/type" component={AddEmployeeType} />
      </Switch>
    </div>
  );
};

export default Employee;
