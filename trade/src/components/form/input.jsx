import React from "react";

const Input = ({ name, label, size, onChange, required = false, ...rest }) => {
  return (
    <div className={`form-group m-3 col-${size}`}>
      <label htmlFor={`${name}Input`}>{label}</label>
      <input
        {...rest}
        name={name}
        className="form-control shadow rounded"
        id={`${name}Input`}
        onChange={onChange}
        onInvalid={onChange}
        onInput={onChange}
        required={required}
        placeholder="..."
      />
    </div>
  );
};

export default Input;
