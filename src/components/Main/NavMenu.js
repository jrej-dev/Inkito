import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useHistory } from "react-router-dom";

import '../../sass/components/Nav.scss';

const NavMenu = ({ navMenuIsActive, user }) => {
  const store = React.useContext(StoreContext);
  const history = useHistory();
  
  if (user && user.account) {
    let userData = JSON.parse(user.account.posting_json_metadata);
    return (
      <li className="login user">
        <img src={userData.profile.profile_image} alt=" " className="user-thumbnail pointer" onClick={() => store.toggleNavMenu()} />
        <div className={navMenuIsActive ? "user-menu flex col pa" : "user-menu flex col hidden"}>
          <p className="pointer" onClick={() => { history.push(`/@${user.name}`); window.location.reload() }}>Profile</p>
          <p className="pointer" onClick={() => { history.push(`/publish?user=${user.name}`); window.location.reload() }}>Publish</p>
          <a href={`https://wallet.hive.blog/@${user.name}/transfers`} target="_blank" rel="noopener noreferrer" title="Hive wallet page">Wallet</a>
          <p className="pointer" onClick={store.logOut}>Logout</p>
        </div>
      </li>
    )
  } else {
    return (
      <li className="login flex row">
        <p className="pointer focus" onClick={() => { store.toggleLogin() }}><button className="hide">Login</button></p>
        <p>/</p>
        <a href="https://hiveonboard.com/create-account?redirect_url=https://inkito.io" title="Hive register page">Register</a>
      </li>
    )
  }
}

export default NavMenu;
