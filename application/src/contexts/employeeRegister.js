import React, { createContext, useState, useContext } from 'react';

export const EmployeeRegisretedContext = createContext();

export const StateProvider = ({ children }) => {
  const [isEmployeeRegistered, setIsEmployeeRegistered] = useState(null);

  return (
    <EmployeeRegisretedContext.Provider
      value={{ isEmployeeRegistered, setIsEmployeeRegistered }}
    >
      {children}
    </EmployeeRegisretedContext.Provider>
  );
};
export const useStateValue = () => useContext(EmployeeRegisretedContext);
