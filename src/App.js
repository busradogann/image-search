import React, { Component } from 'react';

import { Switch, Route } from 'react-router'

import Index from './components/Index';
import Search from './components/Search';
import NoMatch from './components/NoMatch';


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/:query/:collection?" component={Search} />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;
