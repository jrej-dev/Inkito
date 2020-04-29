import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import { useHistory  } from "react-router-dom";
import { toJS } from 'mobx';
import '../../sass/components/Nav.scss';

const NavMenu = () => {  
    const store = React.useContext(StoreContext);
    const history = useHistory();

    useEffect (() => { 
      let mounted = true;
      if (store.loginLink === ""){
        if(mounted){
          store.initHSLogin();
        }
      }
      return () => mounted = false;
    })

    return useObserver(() => {
      if (toJS(store.userDetail)) {
        if (toJS(store.userDetail).name) {
          let username = toJS(store.userDetail).name;
          return (
            <li className="login user">
              <img src={`https://images.hive.blog/u/${username}/avatar`} alt=" " className="user-thumbnail pointer" onClick={() => store.toggleNavMenu()}/>
              <div className={store.navMenuIsActive ? "user-menu flex col" : "user-menu flex col hidden"}>
                <p className="capital pointer" onClick={() => {history.push(`/@${username}`);window.location.reload()}}>{username}</p>
                <p onClick={store.logOut} className="pointer">Logout</p>
              </div>
            </li>
          )
        } else {
          return (
            <li className="login">
              <a href={store.loginLink}>Login</a>
            </li>
          )
        }
      } else {
        return (
          <li className="login">
            <a href={store.loginLink}>Login</a>
          </li>
        )
      }
    })
  }

  export default NavMenu;