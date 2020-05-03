import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useHistory } from "react-router-dom";
import '../../sass/components/Nav.scss';

const NavMenu = ({ navMenuIsActive, userDetail }) => {
  const store = React.useContext(StoreContext);
  const history = useHistory();

  if (userDetail && userDetail.name) {
    let username = userDetail.name;

    return (
      <li className="login user">
        <img src={`https://images.hive.blog/u/${username}/avatar`} alt=" " className="user-thumbnail pointer" onClick={() => store.toggleNavMenu()} />
        <div className={navMenuIsActive ? "user-menu flex col" : "user-menu flex col hidden"}>
          <p className="capital pointer" onClick={() => { history.push(`/@${username}`); window.location.reload() }}>{username}</p>
          <p onClick={store.logOut} className="pointer">Logout</p>
        </div>
      </li>
    )
  } else {
    return (
      <li className="login flex row">
        <a href={store.loginLink}>Login</a>
        <p>/</p>
        <a href="https://signup.hive.io/" target="_blank" rel="noopener noreferrer">Register</a>
      </li>
    )
  }
}

export default NavMenu;