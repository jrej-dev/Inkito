import React from 'react';
import 'wired-elements';
import '../../sass/components/Nav.scss';

import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <div className="title">
        <h1>
          <a href="http://localhost:3000/">Inkito</a>
        </h1>
        <h3 className="nav-comics">
          <Link to="/comics">Comics</Link>
        </h3>
        <h3 className="nav-novels">
          <Link to="/novels">Novels</Link>
        </h3>
      </div>
      <ul>
        <li className="search">
          <wired-search-input placeholder="Search"></wired-search-input>
        </li>
        <li>
          <a href="https://hive.blog/@inkito" target ="_blank" rel="noopener noreferrer">Blog</a>
        </li>
        <li>Login/Register</li>
      </ul>
    </div>
  );
}

export default Nav;