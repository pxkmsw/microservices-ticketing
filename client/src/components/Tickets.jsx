import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import paginate from './paginate';
import { getTickets, deleteTicket, createTicket } from '../services/ticketsService';
import { getCurrentUser } from '../services/authService';
import FullTable from './FullTable';

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

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sort, setSort] = useState({ order: '', by: '' });
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const { data } = await getTickets();
      if (!data.length && getCurrentUser()) defaultTickets.forEach(item => createTicket(item));
      setTickets(data);
    })();
  }, []);

  const onView = id => console.log('view ticket:', id);
  const onBuy = id => console.log('buy ticket:', id);
  const onEdit = id => (window.location = '/edit-ticket/' + id);
  const onSort = sortBy => setSort({ order: sort.order == 'asc' ? 'desc' : 'asc', by: sortBy });
  const onPage = page => setPage(page == 'previous' ? currentPage - 1 : currentPage + 1);
  const onDelete = async id => {
    const updatedTicketList = tickets.filter(ticket => ticket.id != id);
    setTickets(updatedTicketList);
    await deleteTicket(id);
  };

  const onSearch = searchStr => {
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
  const count = sortedItems.length;

  return (
    <FullTable
      data={{ search, count, items, sort, pageSize, currentPage }}
      onEvent={{ onSearch, onDelete, onEdit, onView, onBuy, onSort, onPage }}
    />
  );
};

export default Tickets;
