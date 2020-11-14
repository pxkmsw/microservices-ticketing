import React from 'react';
const SearchResult = ({ items }) => {
  return (
    <div className="m-3 h6 mr-5">
      {items == 0 ? 'No item found' : `${items} relavent items found`}
    </div>
  );
};

export default SearchResult;
