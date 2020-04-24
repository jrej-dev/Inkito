import React from 'react';
import StoreContext from '../../stores/AppStore';
import { useObserver } from 'mobx-react';
import '../../sass/components/Footer.scss';

function CookieBanner() {
  const store = React.useContext(StoreContext);

  const cookieConsent = (e) => {
    if (e.target.className === "cookie") {
      store.cookieConsent = true;
      localStorage.setItem('cookie-consent', JSON.stringify(true));
    } else if (e.target.className === "no-cookie") {
      store.cookieConsent = false;
      localStorage.setItem('cookie-consent', JSON.stringify(false));
    }
  };  
  return useObserver(() => {
    return (
      <div className={store.cookieConsent === null ? "cookie-banner flex-even row pa" : "hidden"}>
          <p>Inkito can use cookies to provide a better browsing experience. By giving your consent you agree to our Privacy Policy and to our use of cookies.</p>
          <div className="buttons flex-even">
              <button className="cookie" onClick={cookieConsent}> Yes, I want cookies</button>
              <button className="no-cookie" onClick={cookieConsent}> No, thank you</button>
          </div>
      </div>
    );
  })
}

export default CookieBanner;