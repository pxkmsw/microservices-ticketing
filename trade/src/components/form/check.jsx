import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Check = ({ name, label, size, onChange, value }) => {
  return (
    <div className={`form-group m-3 col-${size}`}>
      <FormControlLabel
        control={<Checkbox onChange={onChange} checked={value} value={name} />}
        label={label}
      />
    </div>
  );
};

export default Check;
