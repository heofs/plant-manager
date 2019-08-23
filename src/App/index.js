import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastProvider } from 'react-toast-notifications';
import { apolloClient } from 'utils/apollo';
import useCurrentUser from 'enhancers/useCurrentUser';

import Layout from 'components/Layout';
import Dashboard from './pages/Dashboard';
import Plants from './pages/Plants';
import Varieties from './pages/Varieties';
import NotFoundPage from './pages/NotFoundPage';
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

function App() {
  const { currentUser } = useCurrentUser();
  console.log(currentUser);
  return (
    <ToastProvider autoDismissTimeout={4000} placement="bottom-right">
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
                <Route path="*" exact={true} component={NotFoundPage} />
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

export default App;
