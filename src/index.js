import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import { withTracker } from './components/withTracker'
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { HashRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Router basename="/k0mb">
    <Route component={withTracker(App, {})} />
  </Router>,
  document.getElementById('root')
);