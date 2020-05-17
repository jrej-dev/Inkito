import 'core-js';
import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import StoreContext from '../../stores/AppStore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import '../../sass/App.scss';
import Login from '../../components/Login/Login';
import Home from '../../components/Main/Home';
import Footer from '../../components/Main/Footer';
import FullDisplay from '../../components/FullDisplay/FullDisplay';
import Reader from '../../components/Reader/Reader';
import ProfilePage from '../../components/Profile/ProfilePage';
import Page404 from '../../components/Main/Page404';

import SeriesEdit from '../../components/Publish/SeriesEdit';
import PublishPage from '../../components/Publish/PublishPage';

import CookieBanner from '../../components/Main/CookieBanner';

const App = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    store.temporalLogin();

    getUserDetail();
    store.toggleNavMenu(false);
    store.checkCookieConsent();
    if (store.loginLink === "") {
      store.initHSLogin();
    }

    window.addEventListener('scroll', handleScroll);
    return () => {window.removeEventListener('scroll', handleScroll) }
  })

  const handleScroll = () => {
    var st = document.documentElement.scrollTop;
    if (st > 400) {
      store.toggleLogin(false);
    }

  }

  const getUserDetail = () => {
    const accessToken = localStorage.getItem('access-token');
    const user = localStorage.getItem('users');
    if (accessToken && user) {
      store.getUserDetail(JSON.parse(accessToken), JSON.parse(user));
    } else {
      store.getUserDetail();
    }
  }

  const LoginPopUp = () => {
    return useObserver(() => {
        return <Login loginIsActive={store.loginIsActive}/>
    })
  }

  const Publish = () => {
    return useObserver(() => {
      return <PublishPage publishState={store.commentState}/>
    })
  }

  return (
    <Router>
      <div className="App">
        <LoginPopUp />
        <Switch >
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
            <Reader type={"comics"} />
          </Route>
          <Route path="/novelReader">
            <Reader type={"novels"} />
          </Route>
          <Route path="/@*">
            <ProfilePage />
          </Route>
          <Route path="/series">
            <SeriesEdit/>
          </Route>
          <Route path="/publish*">
            <Publish />
          </Route>  
          <Route component={Page404} />
        </Switch>
        <Footer />
        <CookieBanner />
      </div>
    </Router>
  );

}

export default App;
