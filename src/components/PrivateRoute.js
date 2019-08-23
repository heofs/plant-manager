import React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from 'enhancers/useAuth';
import SignInPage from 'App/pages/Login';
import Layout from 'components/Layout';

const PrivateRoute = ({ component, ...options }) => {
  const { user } = useAuth();

  if (!user) {
    return <SignInPage />;
  }

  return (
    <Layout>
      <Route {...options} component={component} />
    </Layout>
  );
};

export default PrivateRoute;
