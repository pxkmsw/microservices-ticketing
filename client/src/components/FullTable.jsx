import React from 'react';
import Search from './Search';
import Table from './Table';
import Pagination from './Pagination';

const FullTable = ({
  data: { search, count, items, sort, pageSize, currentPage },
  onEvent: { onSearch, onDelete, onEdit, onView, onBuy, onSort, onPage },
}) => {
  return (
    <div>
      <Search data={{ search, count }} onEvent={{ onSearch }} />
      <Table data={{ items, sort }} onEvent={{ onDelete, onView, onEdit, onBuy, onSort }} />
      <Pagination data={{ pageSize, currentPage, count }} onEvent={{ onPage }} />
    </div>
  );
};

export default FullTable;
