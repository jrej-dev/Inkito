import React from 'react';
import StoreContext from '../../../stores/appStore';
import { useObserver } from 'mobx-react';
import { Link } from "react-router-dom";
import '../footer.scss';

function CookieBanner() {
  const store = React.useContext(StoreContext);

  const cookieConsent = (e) => {
    if (e.target.className.includes("cookie")) {
      store.cookieConsent = true;
      localStorage.setItem('cookie-consent', JSON.stringify(true));
    } 
  };  

  return useObserver(() => {
    return (
      <div className={store.cookieConsent === null ? "cookie-banner flex-even row pa" : "hidden"}>
          <p>Inkito uses cookies to provide a better browsing experience. By continuing to use this website you agree to our <Link to="/privacy">Privacy Policy</Link> and to our use of cookies.</p>
          <button className="cookie white" onClick={cookieConsent}>Ok</button>
      </div>
    );
  })
}

export default CookieBanner;