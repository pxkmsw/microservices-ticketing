import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'sign-up', href: '/signup' },
    !currentUser && { label: 'sign-in', href: '/signin' },
    currentUser && { label: 'sign-out', href: '/signout' },
    currentUser && { label: 'Create Ticket', href: '/new-ticket' },
    { label: 'Tickets', href: '/tickets' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => (
      <li key={href} className="nav-item border border-primary shadow p-3 mb-5 bg-white rounded">
        <NavLink to={href} className="nav-link">
          {label}
        </NavLink>
      </li>
    ));

  return (
    <nav className="navbar navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        GitTix
      </NavLink>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
