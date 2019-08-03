import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ToastProvider } from 'react-toast-notifications';
import ApolloClient from 'apollo-boost';

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

export const apolloClient = new ApolloClient({
  uri: 'http://192.168.1.31:4000/',
  headers: {
    authorization: 'testTokenCeyJhbGciOiJSU',
  },
});

function App() {
  return (
    <ToastProvider
      autoDismissTimeout={4000}
      // components={{ Toast: MyCustomToast }}
      placement="bottom-right"
    >
      <ApolloProvider client={apolloClient}>
        <Router>
          <Layout>
            <Switch>
              <Route path="/" exact component={Varieties} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/plants" component={Plants} />
              <Route path="/varieties" component={Varieties} />
              <Route path="*" exact={true} component={PageNotFound} />
            </Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    </ToastProvider>
  );
}

export default App;
