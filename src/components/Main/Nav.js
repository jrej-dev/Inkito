import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";
import { toJS } from 'mobx';

import 'wired-elements';
import '../../sass/components/Nav.scss';

function Nav() {
  const store = React.useContext(StoreContext);

  useEffect (() => { 
    store.initHSLogin();
  })

  const LogElement = () => {
    return useObserver(() => {
      if (toJS(store.userDetail).username) {
        return (
          <li>
            <p className="capital">{store.userDetail.username}</p>
            <p onClick={store.logOut} className="pointer">Logout</p>
          </li>
        )
      } else {
        return (
          <li>
            <a href={store.loginLink}>Login</a>
          </li>
        )
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
        <LogElement />
      </ul>
    </div>
  );
}

export default Nav;