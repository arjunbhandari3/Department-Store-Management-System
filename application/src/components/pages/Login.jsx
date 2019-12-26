import React, { useEffect, useState } from 'react';

import './../../sass/Login.scss';

import { useStateValue } from './../../contexts/employeeRegister';

const Login = props => {
  const authValue = useStateValue();
  const [employeeId, setEmployeeId] = useState('');

  useEffect(() => {
    if (authValue.isEmployeeRegistered) {
      props.history.push('/');
    }
  }, [authValue, props.history]);

  return (
    <div>
      <input
        style={{
          border: '1px solid #f0f0f0',
          padding: '1rem 2rem',
          outline: 'none'
        }}
        type="number"
        value={employeeId}
        onChange={e => setEmployeeId(e.target.value)}
      />
      <button
        className="btn"
        onClick={() => authValue.setIsEmployeeRegistered(employeeId)}
      >
        Login
      </button>
    </div>
  );
};

export default Login;
