import React, { Fragment } from 'react';

const Search = ({ data: { search, count }, onEvent: { onSearch } }) => {
  return (
    <Fragment>
      <form className="form-inline m-2 no-print">
        <i className="fas fa-search ml-2" aria-hidden="true" style={{ fontSize: '30px' }} />
        <input
          className="form-control ml-3 w-25 shadow-sm rounded"
          value={search}
          name="search"
          type="text"
          placeholder="Search..."
          aria-label="Search"
          onChange={e => onSearch(e.target.value)}
        />
      </form>
      <div className="m-3 h6 mr-5">{count == 0 ? 'No item found' : `${count} relavent items found`}</div>
    </Fragment>
  );
};

export default Search;
