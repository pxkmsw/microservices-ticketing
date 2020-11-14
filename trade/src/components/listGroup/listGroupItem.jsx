import React, { Component } from "react";
import { PersianNum } from "../table/common/persiandigit";

const ListGroupItem = ({ label, value, size = 6, float = "left" }) => {
  return (
    <span className={`list-group-item col-${size}`}>
      {label} :
      <span style={{ fontWeight: "600", float: float }}>
        {value && " " + PersianNum(value.toLocaleString())}
      </span>
    </span>
  );
};

export default ListGroupItem;
