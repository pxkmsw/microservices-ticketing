import React, { Component } from "react";
import uuid from "uuid";

class TableHeader extends Component {
  raiseSort = (path, listName) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order == "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn, listName);
  };

  sortedIcon = column => {
    if (column.path !== this.props.sortColumn.path) return null;
    if (this.props.sortColumn.order === "asc")
      return <i className="fa fa-sort-up" />;
    return <i className="fa fa-sort-down" />;
  };

  render() {
    const { columns, listName } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => {
            return (
              <th
                key={uuid.v4()}
                onClick={() => this.raiseSort(column.path, listName)}
                style={{ cursor: "pointer" }}
              >
                {column.label} {this.sortedIcon(column, listName)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
