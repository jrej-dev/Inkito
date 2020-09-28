import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/appstore';
import { useObserver } from 'mobx-react';
import './login.scss';
import LoginImage from '../../assets/images/login.png';
import Hivesigner from '../../assets/icons/hivesigner.svg';
import HSLogo from '../../assets/icons/hivesigner.png';

const Login = () => {
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

  return useObserver(() => {
    let loginIsActive= store.loginIsActive
    return (
      <div className={loginIsActive ? "login-popup" : "login-popup hidden-top-login"}>
        <img className="login-image" src={LoginImage} alt="login" />
        <div className="login-content">

          <h2 className="title">Inkito</h2>

          <div className="keychain-divider flex full row pa-hh">
            <hr />
            <p>Hivesigner extension</p>
            <hr />
          </div>

          <img src={HSLogo} alt="Hivesigner Logo" className="hivesigner-image" />
          {
            typeof window !== 'undefined' && window && window._hivesigner ?

              <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                <div className="login-input flex row">
                  <h2 className="arobase">@</h2>
                  <wired-input
                    placeholder="Account Name"
                    ref={usernameInput}
                    value={username}
                  />
                </div>

                <div className="buttons">
                  <button type="submit" className="send-btn white">Send</button>
                  <p className="pointer" onClick={handleCancel}>Cancel</p>
                </div>
              </form>
              :
              <div className="buttons">
                <a href="https://chrome.google.com/webstore/detail/hivesigner/ophihnhnfgcmhpbcennhppicomdeabip" title="Install hivesigner for chrome">Install for Chrome</a>
                {/*<a href="https://addons.mozilla.org/en-US/firefox/addon/hive-keychain/">Install for Firefox</a>*/}
              </div>
          }

          <div className="flex row full pa-hh">
            <hr />
            <p>Other login method</p>
            <hr />
          </div>

          <div className="login-hivesigner">
            <a href={store.loginLink} title="Hivesigner login">
              <img src={Hivesigner} className="hivesigner" alt="hivesigner" />
            </a>
          </div>

        </div>
      </div>
    );
  })
}


export default Login;
