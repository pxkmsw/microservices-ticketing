import React, { useEffect, useState } from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import Pagination from './Pagination';
import paginate from './paginate';
import Search from './Search';
import SearchResult from './SearchResult';
import { getTickets, deleteTicket, createTicket } from '../services/ticketsService';
import { getCurrentUser } from '../services/authService';

const defaultTickets = [
  { title: 'Yanni Concert', price: 128 },
  { title: 'Ebi Concert', price: 98 },
  { title: 'Supre Bowl', price: 52 },
  { title: 'New Years Event', price: 31 },
  { title: 'Christmas Party', price: 18 },
  { title: 'Music Festival', price: 62 },
  { title: 'Spring Festival', price: 19 },
  { title: 'Nowruz Event', price: 128 },
  { title: 'Octoberfest', price: 21 },
  { title: 'Holloween Night', price: 36 },
  { title: 'Thanksgiving Dinner', price: 79 },
  { title: 'Easter Party', price: 89 },
  { title: 'Union Day Concert', price: 49 },
];

const Dashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setPage] = useState(1);
  const [sort, setSort] = useState({ order: '', by: '' });

  useEffect(() => {
    (async () => {
      const { data } = await getTickets();
      if (!data.length && getCurrentUser()) defaultTickets.forEach(item => createTicket(item));
      setTickets(data);
    })();
  }, []);

  const getNormalizedStr = str => (str.length > 40 ? str.substring(0, 40) + '...' : str);

  const removeTicket = async id => {
    const updatedTicketList = tickets.filter(ticket => ticket.id != id);
    setTickets(updatedTicketList);
    await deleteTicket(id);
  };

  const editTicket = id => (window.location = '/Edit-Ticket/' + id);
  const viewTicket = id => console.log('view ticket:', id);
  const buyTicket = id => console.log('buy ticket:', id);

  const handlePageChange = page =>
    setPage(page == 'previous' ? currentPage - 1 : currentPage + 1);

  const onSort = sortBy =>
    setSort({ order: sort.order == 'asc' ? 'desc' : 'asc', by: sortBy });

  const sortedIcon = sortBy => {
    let sortIcons = <i className={`fa fa-sort`} />;
    if (sortBy == sort.by)
      sortIcons = <i className={`fa fa-sort-${sort.order === 'asc' ? 'up' : 'down'}`} />;
    return sortIcons;
  };

  const handleSearch = searchStr => {
    if (searchStr != '') {
      const filteredItems = tickets.filter(
        item => item.title && item.title.toLowerCase().includes(searchStr.toLowerCase())
      );
      setPage(1);
      setFilteredTickets(filteredItems);
    }
    setSearch(searchStr);
  };

  const pageSize = 6;
  const searchedItems = search == '' ? tickets : filteredTickets;
  const sortedItems = _.orderBy(searchedItems, [sort.by], [sort.order]);
  const items = paginate(sortedItems, pageSize, currentPage);

  return (
    <div>
      <Search search={search} onSearch={handleSearch} />
      <SearchResult items={sortedItems.length} />
      <table className="table table-striped table-hover">
        <caption>List of available tickets</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th key={uuid.v4()} onClick={() => onSort('title')} style={{ cursor: 'pointer' }}>
              Title {sortedIcon('title')}
            </th>
            <th key={uuid.v4()} onClick={() => onSort('price')} style={{ cursor: 'pointer' }}>
              Price {sortedIcon('price')}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ title, price, id }, i) => (
            <tr key={id}>
              <th scope="row" key={i + id}>
                {i + 1}
              </th>
              <td key={title}>{getNormalizedStr(title)}</td>
              <td key={price + id}>${price}</td>

              <td style={{ float: 'right' }}>
                <button className="btn btn-primary" onClick={() => buyTicket(id)}>
                  Buy
                </button>
                <button
                  className="btn btn-raised btn-warning ml-2 shadow rounded"
                  data-placement="top"
                  title="View"
                  onClick={() => viewTicket(id)}
                >
                  View
                </button>
                <button
                  className="btn btn-raised btn-secondary ml-2 shadow rounded"
                  data-placement="top"
                  title="Edit"
                  onClick={() => editTicket(id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-raised btn-danger ml-2 shadow rounded"
                  data-placement="top"
                  title="Delete"
                  onClick={() => removeTicket(id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageSize={pageSize}
        currentPage={currentPage}
        numOfItems={sortedItems.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Dashboard;
