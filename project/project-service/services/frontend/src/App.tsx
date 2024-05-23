import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';

import Login from "./pages/Login";
import Main from './pages/Main';
import Hello from "./pages/Main/Hello";
import MainWrapper from './pages/Main/MainWrapper';
import NotFound from './pages/NotFound';
import AlertList from './components/AlertList';
import Bike from './pages/Main/Bike';
import Account from './pages/Main/Account';
import Area from './pages/Main/Bike/Area';

const App: Component = () => {
  return <>
    <AlertList />
    <Router>
      <Route path="/login" component={Login}></Route>

      <Route path="/" component={MainWrapper}>
        <Route path="/" component={Main}></Route>
        <Route path="/hello" component={Hello}></Route>
        <Route path="/bike">
          <Route path="/" component={Bike}></Route>
          <Route path="/area/:id" component={Area}></Route>
        </Route>
        <Route path="/account" component={Account}></Route>
      </Route>

      <Route path="*404" component={NotFound}></Route>
    </Router>
  </>;
};

export default App;
