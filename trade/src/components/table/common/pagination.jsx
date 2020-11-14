import React, { Component } from "react";
import { PersianNum } from "./persiandigit";
import _ from "lodash";

const Pagination = props => {
  const pagesCount = Math.ceil(props.itemsCount / props.pageSize);
  if (pagesCount == 1) {
    return null;
  }
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav ria-label="Page navigation example">
      <ul
        className="pagination justify-content-center"
        style={{ direction: "ltr" }}
      >
        <li
          className={"page-item"}
          style={{ cursor: "pointer" }}
          onClick={
            props.currentPage == 1 ? "" : () => props.onPageChange("previous")
          }
        >
          <a className="page-link">قبلی</a>
        </li>
        <li className={"page-item"} style={{ cursor: "pointer" }}>
          <a className="page-link">
            {PersianNum(props.currentPage)} از {PersianNum(pages.length)}
          </a>
        </li>
        <li
          className={"page-item"}
          style={{ cursor: "pointer" }}
          onClick={
            props.currentPage == pages.length
              ? ""
              : () => props.onPageChange("next")
          }
        >
          <a className="page-link">بعدی</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
