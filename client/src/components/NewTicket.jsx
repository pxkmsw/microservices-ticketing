import React, { useState } from 'react';
import { createTicket } from '../services/ticketsService';

const NewTicket = () => {
  const [ticket, setTicket] = useState({});

  const onSubmit = async event => {
    event.preventDefault();
    await createTicket(ticket);
    window.location = '/Dashboard';
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>New Ticket</h1>
        <div className="form-group">
          <labal>Ticket Title</labal>
          <input
            value={ticket.title}
            onChange={e => setTicket({ title: e.target.value, price: ticket.price })}
            type="text"
            className="form-control w-50"
          />
        </div>
        <div className="form-group">
          <labal>Ticket Price</labal>
          <input
            value={ticket.price}
            onChange={e => setTicket({ title: ticket.title, price: e.target.value })}
            type="number"
            className="form-control w-50"
          />
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default NewTicket;
