import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Varieties from './pages/Varieties';
import PageNotFound from './pages/PageNotFound';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faLeaf,
  faSeedling,
  faBraille,
  faPray,
} from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faLeaf, faSeedling, faBraille, faPray);

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/plants" component={Plants} />
          <Route path="/varieties" component={Varieties} />
          <Route path="*" exact={true} component={PageNotFound} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
