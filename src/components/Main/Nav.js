import React from 'react';

import NavMenu from './NavMenu';
import { Link } from "react-router-dom";
import '../../sass/components/Nav.scss';

function Nav() {

  return (
    <div className="Nav flex">
      <div className="title flex-start pa-h">
        <h1>
          <Link to="/">Inkito</Link>
        </h1>
      </div>
      <ul>
        <li className="search">
          <wired-search-input placeholder="Search"></wired-search-input>
        </li>
        <li className="nav-comics">
          <Link to="/comics">Comics</Link>
        </li>
        <li className="nav-novels">
          <Link to="/novels">Novels</Link>
        </li>
        <li className="nav-blog">
          <a href="https://hive.blog/@inkito" target="_blank" rel="noopener noreferrer">Blog</a>
        </li>
        <NavMenu />
      </ul>
    </div>
  );
}

export default Nav;