import React, { Component } from "react";
import TableHeader from "../table/common/tableHeader";
import TableBody from "../table/common/tableBody";

const Table = ({ user, listName, columns, sortColumn, onSort, ...rest }) => {
  return (
    <table className="table table-hover">
      <TableHeader
        listName={listName}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody listName={listName} columns={columns} {...rest} />
    </table>
  );
};

export default Table;
