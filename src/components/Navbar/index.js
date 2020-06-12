import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from 'constants/routes';

import Icon from 'components/Icon';

import './styles.scss';

function Navbar() {
  const navLinks = Object.values(ROUTES);

  return (
    <nav className="nav">
      <ul className="nav__links">
        {navLinks.map(route => (
          <NavLink key={route.id} className="nav-link" activeClassName="nav-link--active" to={route.path}>
            <Icon className="nav-link__icon" name={route.icon} />
            <span className="nav-link__text">{route.title}</span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
