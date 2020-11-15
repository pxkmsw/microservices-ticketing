import React from 'react';
import _ from 'lodash';

const Pagination = ({ data: { count, pageSize, currentPage }, onEvent: { onPage } }) => {
  const pagesCount = Math.ceil(count / pageSize);
  if (pagesCount == 1) return null;

  const pages = _.range(1, pagesCount + 1);
  return (
    <nav ria-label="Page navigation">
      <ul className="pagination justify-content-center" style={{ direction: 'ltr' }}>
        <li
          className={`page-item`}
          style={{ cursor: 'pointer' }}
          onClick={currentPage == 1 ? () => '' : () => onPage('previous')}
        >
          <a className={`page-link ${currentPage == 1 ? 'text-secondary' : ''}`}>previous</a>
        </li>
        <li className={'page-item'} style={{ cursor: 'pointer' }}>
          <a className="page-link">
            {currentPage} of {pages.length}
          </a>
        </li>
        <li
          className={`page-item`}
          style={{ cursor: 'pointer' }}
          onClick={currentPage == pages.length ? () => '' : () => onPage('next')}
        >
          <a className={`page-link ${currentPage == pages.length ? 'text-secondary' : ''}`}>next</a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
