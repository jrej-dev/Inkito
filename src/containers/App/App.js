import 'core-js';
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import StoreContext from '../../stores/appStore';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './app.scss';

//Routes
import Home from '../../routes/home/home';
import FullDisplay from '../../routes/fulldisplay/fulldisplay';
import Reader from '../../routes/reader/reader';
import ProfilePage from '../../routes/profilepage/profilepage';
import PublishPage from '../../routes/publish/publishpage';
import Page404 from '../../routes/page404/page404';
import Terms from '../../routes/terms/terms';
import Privacy from '../../routes/privacy/privacy';
import Faq from '../../routes/faq/faq';

//Components
import Login from '../../components/login/login';
import Navbar from '../../components/nav/index';
import Footer from '../../components/footer/footer';
import CookieBanner from '../../components/footer/cookiebanner/cookiebanner';

const App = () => {
  const store = React.useContext(StoreContext);

  useEffect(() => {
    getUserDetail();

    store.temporalLogin();
    store.toggleNavMenu(false);
    store.checkCookieConsent();
    
    if (store.loginLink === "") {
      store.initHSLogin();
    }
    
    window.addEventListener('keydown', handleFirstTab);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); 
      window.removeEventListener('keydown', handleFirstTab);
    }
  })

  const handleFirstTab = (e) => {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
  }

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

  return (
    <Router>
      <Helmet>
        <html lang="en" />
        <title>Help authors get crypto currency rewards for their story | Inkito</title>
        <meta name="description" content="Inkito is a comic and novel hosting powered by the Hive blockchain. Creators can earn crypto currency for their content in proportion to the attention received." />
      </Helmet>
      <div className="App">
        <Login />
        <Navbar />
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
          <Route path="/publish*">
            <PublishPage />
          </Route>  
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/faq">
            <Faq />
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
