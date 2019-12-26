import React from 'react';
import './../../sass/Input.scss';

const Input = ({
  value,
  setValue,
  type = 'text',
  name,
  placeholder,
  label,
  isDisabled
}) => {
  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor={name}>
        {label}
      </label>
      <input
        disabled={isDisabled}
        className="form-group__input"
        id={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default Input;
