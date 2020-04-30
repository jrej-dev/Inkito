import React, { useEffect } from 'react';
import StoreContext from '../../stores/AppStore';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from "react-router-dom";
import '../../sass/App.scss';
import Home from '../../components/Main/Home';
import Footer from '../../components/Main/Footer';
import FullDisplay from '../../components/FullDisplay/FullDisplay';
import Reader from '../../components/Reader/Reader';
import ProfilePage from '../../components/Profile/ProfilePage';
import Page404 from '../../components/Main/Page404'; 
import CookieBanner from '../../components/Main/CookieBanner'; 

const App = () => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    getUserDetail();
    store.toggleNavMenu(false);
    store.checkCookieConsent();
    if (store.loginLink === ""){
      store.initHSLogin();
    }
    console.log(Date.now());
  })

  const getUserDetail = () => {
    const accessToken = localStorage.getItem('access-token');
    const user = localStorage.getItem('users');
    if (accessToken && user) {
      store.getUserDetail(JSON.parse(accessToken), JSON.parse(user));
    } else {
      store.getUserDetail();
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/comics">
            <FullDisplay type={"comics"} />
          </Route>
          <Route exact path="/novels">
            <FullDisplay type={"novels"} />
          </Route>
          <Route path="/comicReader">
            <Reader type={"comics"}/>
          </Route>
          <Route path="/novelReader">
            <Reader type={"novels"}/>
          </Route>
          <Route path="/@*">
            <ProfilePage />
          </Route>
          <Route component={Page404} />
        </Switch>
        <Footer />
        <CookieBanner/>
      </div>
      </Router>
  );
}

export default App;
