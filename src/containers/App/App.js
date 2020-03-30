import React, {Component} from 'react';

import {
  BrowserRouter as Router,
  Switch, 
  Route,
  Link
} from "react-router-dom";

import Home from '../../components/Main/Home';

class App extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
