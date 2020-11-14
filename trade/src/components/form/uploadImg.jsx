import React from "react";

const UploadImg = ({ name, label, size, onChange, ...rest }) => {
  return (
    <div className={`form-group m-4 col-${size}`}>
      <label
        htmlFor={`${name}Input`}
        className="btn btn-secondary shadow-lg rounded"
      >
        {label}
      </label>
      <input
        {...rest}
        name={name}
        className="form-control form-control-lg"
        id={`${name}Input`}
        onChange={onChange}
        style={{ visibility: "hidden" }}
      />
    </div>
  );
};

export default UploadImg;
