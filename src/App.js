import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ToastProvider } from 'react-toast-notifications';
import { withCurrentUser } from './utils/authentication';
import { apolloClient } from './utils/apollo';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Varieties from './pages/Varieties';
import PageNotFound from './pages/PageNotFound';
import LoginPage from './pages/Login';

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

function App({ currentUser }) {
  return (
    <ToastProvider
      autoDismissTimeout={4000}
      // components={{ Toast: MyCustomToast }}
      placement="bottom-right"
    >
      {currentUser ? (
        <ApolloProvider client={apolloClient}>
          <Router>
            <Layout>
              <Switch>
                <Route path="/" exact component={Varieties} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/plants" component={Plants} />
                <Route path="/varieties" component={Varieties} />
                <Route path="/login" component={LoginPage} />
                <Route path="*" exact={true} component={PageNotFound} />
              </Switch>
            </Layout>
          </Router>
        </ApolloProvider>
      ) : (
        <LoginPage />
      )}
    </ToastProvider>
  );
}

export default withCurrentUser(App);
