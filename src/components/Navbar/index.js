import React from 'react';
import { NavLink } from 'react-router-dom';

import ROUTES from 'constants/routes';

import Icon from 'components/Icon';

import styles from './styles.module.scss';

function Navbar() {
  const navLinks = Object.values(ROUTES);

  return (
    <nav className={styles.nav}>
      <ul className={styles['nav__links']}>
        {navLinks.map(route => (
          <NavLink key={route.id} className={styles['nav-link']} to={route.path}>
            <Icon className={styles['nav-link__icon']} name={route.icon} />
            <span className={styles['nav-link__text']}>{route.name.toUpperCase()}</span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
