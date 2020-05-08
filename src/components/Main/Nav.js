import React,{ useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import NavMenu from './NavMenu';
import { Link } from "react-router-dom";
import '../../sass/components/Nav.scss';

const Nav = () => {
  const store = React.useContext(StoreContext);

  useEffect (() => { 
    return () => dispose();
  })

  const dispose = () => {
    Menu = () => { "" };
  }

  let Menu = () => {
    return useObserver(() => {
      if (toJS(store.userDetail) && toJS(store.userDetail).name) {
        return <NavMenu navMenuIsActive={store.navMenuIsActive} username={toJS(store.userDetail).name} />
      } else {
        return <NavMenu />
      }
    })
  }

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
        <Menu />
      </ul>
    </div>
  );
}

export default Nav;