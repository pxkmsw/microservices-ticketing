import React, { Component } from "react";

const Search = ({ search, onSearch }) => {
  return (
    <form className="form-inline m-2 no-print">
      <i
        className="fas fa-search ml-2"
        aria-hidden="true"
        style={{ fontSize: "30px" }}
      />
      <input
        className="form-control ml-3 w-25 shadow-sm rounded"
        value={search}
        name="search"
        type="text"
        placeholder="جستجو..."
        aria-label="Search"
        onChange={e => onSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
