import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateTicket, getTicket } from '../services/ticketsService';

const EditTicket = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState({ title: '', price: null, id });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await getTicket(id);
      setTicket(data);
    })();
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await updateTicket(ticket);
      window.location = '/Dashboard';
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
        <h1>Edit Ticket</h1>
        <div className="form-group">
          <label>Ticket Title</label>
          <input
            value={ticket.title}
            onChange={e => setTicket({ ...ticket, title: e.target.value })}
            type="text"
            className={`form-control w-50 ${errors.title && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.title}</div>
        </div>
        <div className="form-group">
          <label>Ticket Price</label>
          <input
            value={ticket.price}
            onChange={e => setTicket({ ...ticket, price: e.target.value })}
            type="number"
            className={`form-control w-50 ${errors.price && 'is-invalid'}`}
          />
          <div className="invalid-feedback">{errors.price}</div>
        </div>
        <button className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditTicket;
