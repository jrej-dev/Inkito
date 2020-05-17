import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Login.scss';
import LoginImage from '../Icons/login.png';
import Hivesigner from '../Icons/hivesigner.svg';
import Keychain from '../Icons/keychain.png';

const Login = ({ loginIsActive }) => {
  const store = React.useContext(StoreContext);
  const [username, setUsername] = useState("");
  const usernameInput = useRef(null);

  useEffect(() => {
    var currentUsername = usernameInput.current;
    if (currentUsername) {
      currentUsername.addEventListener('input', handleChange);
    }
    return () => {
      if (currentUsername) {
        currentUsername.removeEventListener('input', handleChange);
      }
    }
  })

  const handleChange = (e) => {
    setUsername(e.detail.sourceEvent.target.value);
  }

  const handleSubmit = () => {
    store.login(username.toLowerCase());
  }

  const handleCancel = () => {
    store.toggleLogin();
  };

  return (
    <div className={loginIsActive ? "login-popup" : "login-popup hidden-top-login"}>
      <img className="login-image" src={LoginImage} alt="login" />
      <div className="login-content">

        <h2 className="title">Inkito</h2>

        <div className="keychain-divider flex full row pa-hh">
          <hr className="first-divider divider" />
            <p>Hive Keychain</p>
          <hr className="divider" />
        </div>

        <div className="keychain-image">
          <img src={Keychain} alt="keychain"/>
        </div>
        {
        typeof window !== 'undefined' && window && window.hive_keychain ?
      
        <form onSubmit={(e) => {e.preventDefault(); handleSubmit()}}>
          <div className="input flex row">
            <h2 className="arobase">@</h2>
            <wired-input 
              placeholder="Account Name" 
              ref={usernameInput}
              value={username}
            />
          </div>
          
          <div className="buttons">
            <button type="submit" className="send-btn">Send</button>
            <p className="pointer" onClick={handleCancel}>Cancel</p>
          </div>
        </form>
        :
        <div className="buttons">
            <a href="https://chrome.google.com/webstore/detail/hive-keychain/jcacnejopjdphbnjgfaaobbfafkihpep">Install for Chrome</a>
            <a href="https://addons.mozilla.org/en-US/firefox/addon/hive-keychain/">Install for Firefox</a>
        </div>
        }
        
        <div className="flex row full pa-hh">
          <hr className="divider" />
          <p>Other login method</p>
          <hr className="divider" />
        </div>

        <div className="login-hivesigner">
          <a href={store.loginLink}>
            <img src={Hivesigner} className="hivesigner" alt="hivesigner" />
          </a>
        </div>

      </div>
    </div>
  );
}


export default Login;
