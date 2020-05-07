import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useHistory } from "react-router-dom";
import { useObserver } from 'mobx-react';
import { toJS } from 'mobx';

import '../../sass/components/Nav.scss';

const NavMenu = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  return useObserver(() => {

    if (toJS(store.userDetail) && toJS(store.userDetail).name) {
      let username = toJS(store.userDetail).name;

      return (
        <li className="login user">
          <img src={`https://images.hive.blog/u/${username}/avatar`} alt=" " className="user-thumbnail pointer" onClick={() => store.toggleNavMenu()} />
          <div className={store.navMenuIsActive ? "user-menu flex col pa" : "user-menu flex col hidden"}>
            <p className="pointer" onClick={() => { history.push(`/@${username}`); window.location.reload() }}>Profile</p>
            <a href={`https://wallet.hive.blog/@${username}/transfers`} target="_blank" rel="noopener noreferrer">Wallet</a>
            <p className="pointer" onClick={store.logOut}>Logout</p>
          </div>
        </li>
      )
    } else {
      return (
        <li className="login flex row">
          <p className="pointer" onClick={() => { store.toggleLogin() }}>Login</p>
          <p>/</p>
          <a href="https://signup.hive.io/" target="_blank" rel="noopener noreferrer">Register</a>
        </li>
      )
    }
  })
}

export default NavMenu;
