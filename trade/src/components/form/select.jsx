import React from "react";
import uuid from "uuid";

const Select = ({ name, label, value, options, size, onChange }) => {
  return (
    <div className={`form-group m-3 col-${size}`}>
      <label htmlFor={`${name}Input`}>{label}</label>
      <select
        className="form-control form-control-lg shadow rounded"
        id={`${name}Input`}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options &&
          options[0] &&
          options.map(option => (
            <option
              key={`option${option._id}`}
              id={option._id}
              value={option.name}
            >
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
