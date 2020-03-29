import React from 'react';
import { WiredSearchInput } from "wired-elements";
import '../../sass/components/Nav.scss';

function Nav() {
  return (
    <div className="Nav">
      <h1 className="title">Inkito</h1>
      <ul>
        <li className="search">
          <wired-search-input placeholder="Search"></wired-search-input>
        </li>
        <li>Blog</li>
        <li>Login/Register</li>
      </ul>
    </div>
  );
}

export default Nav;
