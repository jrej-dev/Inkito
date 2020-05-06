import React, { useRef, useEffect, useState } from 'react';
import StoreContext from '../../stores/AppStore';
import '../../sass/components/Login.scss';
import LoginImage from '../Icons/login.png';
import Hivesigner from '../Icons/hivesigner.svg';

const Login = ({ loginIsActive }) => {
  const store = React.useContext(StoreContext);
  const usernameInput = useRef(null);
  const ppkInput = useRef(null);

  const [username, setUsername] = useState("");
  const [PPK, setPPK] = useState("");

  useEffect(() => {
    var currentUsername = usernameInput.current;
    var currentPpk = ppkInput.current;

    if (currentUsername) {
      currentUsername.addEventListener('input', handleUsernameChange);
    }
    if (currentPpk) {
      currentPpk.addEventListener('input', handlePpkChange);
    }
    return () => {
      if (currentUsername) {
        currentUsername.removeEventListener('input', handleUsernameChange);
      }
      if (currentPpk) {
        currentPpk.removeEventListener('input', handlePpkChange);
      }
    }
  }, [])

  const handleUsernameChange = (e) => {
    setUsername(e.detail.sourceEvent.target.value);
  }

  const handlePpkChange = (e) => {
    setPPK(e.detail.sourceEvent.target.value);
  }

  const handleSubmit = () => {
    //console.log(username, PPK);
  }

  return (
    <div className={loginIsActive ? "login-popup" : "login-popup hidden-top-login"}>
      <img className="login-image" src={LoginImage} alt="login" />
      <div className="login-content">

        <h2>Inkito</h2>

        <div className="flex row divider pa-hh">
          <hr className="divider" />
          <p>Creator Login</p>
          <hr className="divider" />
        </div>

        <form >
          <div className="flex row">
            <h2 className="arobase">@</h2>
            <wired-input 
              placeholder="Account Name" 
              ref={usernameInput}
              value={username}
            />
          </div>
          <div>
            <wired-input 
              placeholder="Private Posting Key"
              ref={ppkInput}
              value={PPK} 
            />
          </div>

          <div className="buttons">
            <button type="submit" className="send-btn" onClick={(e) => {handleSubmit(); e.preventDefault()}}>Send</button>
            <p className="pointer" onClick={() => { store.toggleLogin() }}>Cancel</p>
          </div>
        </form>

        <div className="flex row divider pa-hh">
          <hr className="divider" />
          <p>Reader Login (No image upload)</p>
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
