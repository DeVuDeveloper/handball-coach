import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

const Hamburger = () => {
 

  return (
    <div className="hamburger-menu">
      <Menu>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <p>HOME</p>
            </NavLink>
          </li>
          <li>
           
            <NavLink
              to="salary"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              <p>Test</p>
            </NavLink>
           
          </li>

          
        </ul>
      </Menu>
    </div>
  );
};
export default Hamburger;