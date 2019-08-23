import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastProvider } from 'react-toast-notifications';
import { apolloClient } from 'utils/apollo';
import PrivateRoute from 'components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Varieties from './pages/Varieties';
import NotFoundPage from './pages/NotFoundPage';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHeart,
  faLeaf,
  faSeedling,
  faBraille,
  faPray,
  faDna,
} from '@fortawesome/free-solid-svg-icons';
library.add(faHeart, faLeaf, faSeedling, faBraille, faPray, faDna);

const App = () => {
  return (
    <ToastProvider autoDismissTimeout={4000} placement="bottom-right">
      <ApolloProvider client={apolloClient}>
        <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Varieties} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/plants" component={Plants} />
            <PrivateRoute path="/varieties" component={Varieties} />
            <PrivateRoute path="*" exact={true} component={NotFoundPage} />
          </Switch>
        </Router>
      </ApolloProvider>
    </ToastProvider>
  );
};

export default App;
