import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Sign-up', href: '/Signup' },
    !currentUser && { label: 'Sign-in', href: '/Signin' },
    currentUser && { label: 'Sign-out', href: '/Signout' },
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
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
