import { Route, Router } from '@solidjs/router';
import type { Component } from 'solid-js';

import Hello from "./pages/Hello";
import Login from "./pages/Login";
import MainWrapper from './pages/main/MainWrapper';
import Main from './pages/main/Main';
import NotFound from './pages/NotFound';
import AlertList from './components/AlertList';

const App: Component = () => {
  return <>
    <AlertList />
    <Router>
      <Route path="/login" component={Login}></Route>

      <Route path="/" component={MainWrapper}>
        <Route path="/" component={Main}></Route>
        <Route path="/hello" component={Hello}></Route>
      </Route>

      <Route path="*404" component={NotFound}></Route>
    </Router>
  </>;
};

export default App;
