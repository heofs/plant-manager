import React from 'react';
import { Redirect } from 'react-router-dom';
import { withAuthentication } from '../../utils/authentication';

const LoginPage = ({ currentUser, login }) => {
  if (currentUser) {
    return <Redirect to={'/'} />;
  }
  return (
    <div>
      <h1>Not signed in</h1>
      <button onClick={() => login('henning@mail.com', 'Password123')}>
        Sign in
      </button>
    </div>
  );
};

export default withAuthentication(LoginPage);
