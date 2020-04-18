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


const App = () => {
  const store = React.useContext(StoreContext);

  useEffect (() => {
    fetchContent();
  })

  const fetchContent = () => {
    store.fetchComics(store.comicsQuery);
    store.fetchNovels(store.novelsQuery);
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/comics">
            <FullDisplay display={"comics"} />
          </Route>
          <Route exact path="/novels">
            <FullDisplay display={"novels"} />
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
        </Switch>
        <Footer />
      </div>
      </Router>
  );
}

export default App;
