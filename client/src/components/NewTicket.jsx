import React, { useState } from 'react';
import { createTicket } from '../services/ticketsService';

const NewTicket = () => {
  const [ticket, setTicket] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await createTicket(ticket);
      window.location = '/tickets';
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errObj = {};
        ex.response.data.errors.forEach(error => (errObj[error.field] = error.message));
        setErrors(errObj);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <h1>New Ticket</h1>
        <div className="form-group">
          <label>Ticket Title</label>
          <input
            value={ticket.title}
            onChange={e => setTicket({ title: e.target.value, price: ticket.price })}
            type="text"
            className={`form-control w-50 ${errors.title && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="form-group">
          <label>Ticket Price</label>
          <input
            value={ticket.price}
            onChange={e => setTicket({ title: ticket.title, price: e.target.value })}
            type="number"
            className={`form-control w-50 ${errors.price && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.price}</div>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default NewTicket;
