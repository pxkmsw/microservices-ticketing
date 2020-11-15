import React, { Fragment } from 'react';
import uuid from 'uuid';
import { getCurrentUser } from '../services/authService';

const Table = ({ data: { items, sort }, onEvent: { onDelete, onEdit, onView, onBuy, onSort } }) => {
  const user = getCurrentUser();
  const getNormalizedStr = str => (str.length > 40 ? str.substring(0, 40) + '...' : str);
  const sortedIcon = sortBy => {
    let sortIcons = <i className={`fa fa-sort`} />;
    if (sortBy == sort.by) sortIcons = <i className={`fa fa-sort-${sort.order === 'asc' ? 'up' : 'down'}`} />;
    return sortIcons;
  };

  return (
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
              <button className="btn btn-raised btn-primary ml-2 shadow rounded" onClick={() => onBuy(id)}>
                Buy
              </button>
              <button className="btn btn-raised btn-warning ml-2 shadow rounded" onClick={() => onView(id)}>
                View
              </button>
              {user && (
                <Fragment>
                  <button className="btn btn-raised btn-secondary ml-2 shadow rounded" onClick={() => onEdit(id)}>
                    Edit
                  </button>
                  <button className="btn btn-raised btn-danger ml-2 shadow rounded" onClick={() => onDelete(id)}>
                    Delete
                  </button>
                </Fragment>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
