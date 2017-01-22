import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Main from '../pages/Main'
import Welcome from '../pages/Welcome'
import SecondPage from '../pages/SecondPage'

module.exports = (
  <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <Route path="/secondpage" component={SecondPage}/>
        <IndexRoute component={Welcome} />
      </Route>
  </Router>
);
