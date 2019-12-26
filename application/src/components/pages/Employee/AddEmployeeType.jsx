import React, { useState } from 'react';
import axios from 'axios';

import Input from './../../utility/Input';

import './../../../sass/AddCustomer.scss';

const AddEmployeeType = () => {
  const [working_hour, setWorkingHour] = useState('');
  const [post, setPost] = useState('');
  const [monthly_salary, setMonthlySalary] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post(`/api/employeetype`, { working_hour, post, monthly_salary })
      .then(() => {
        alert('Employee Added Successfully');
        setWorkingHour('');
        setPost('');
        setMonthlySalary('');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-customer">
      <h1 className="main-heading">Add Employee Type</h1>
      <form className="add-customer__form" onSubmit={handleSubmit}>
        <Input
          label="Employee Post"
          placeholder="Enter Employee Post..."
          name="post"
          value={post}
          setValue={setPost}
        />
        <Input
          label="Employee Working Hour"
          placeholder="Enter Employee Working Hour..."
          name="working_hour"
          value={working_hour}
          setValue={setWorkingHour}
        />
        <Input
          label="Employee Salary"
          placeholder="Enter Employee Salary..."
          name="salary"
          value={monthly_salary}
          setValue={setMonthlySalary}
        />
        <button className="btn btn--submit">Add Employee Type</button>
      </form>
    </div>
  );
};

export default AddEmployeeType;
