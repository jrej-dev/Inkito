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
      if (toJS(store.userDetail)) {
        let username = toJS(store.userDetail).name;
        return (
          <li className="user">
            <img src={`https://steemitimages.com/u/${username}/avatar`} alt=" " className="user-thumbnail pointer" onClick={() => store.toggleNavMenu()}/>
            <div className={store.navMenuIsActive ? "user-menu flex col" : "user-menu flex col hidden"}>
              <Link to={`/@${username}`}>
                <p className="capital">{username}</p>
              </Link>
              <p onClick={store.logOut} className="pointer">Logout</p>
            </div>
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