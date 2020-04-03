import React from 'react';
import { StoreProvider } from '../../stores/AppStore';
import {
  BrowserRouter as Router,
  Switch, 
  Route,
} from "react-router-dom";
import '../../sass/App.scss';
import Nav from '../../components/Main/Nav';
import Home from '../../components/Main/Home';
import Footer from '../../components/Main/Footer';
import FullDisplay from '../../components/FullDisplay/FullDisplay';

const App = () => {
  
  return (
    <StoreProvider>
      <Router>
        <div className="App">
          <Nav />
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
          </Switch>
          <Footer />
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
