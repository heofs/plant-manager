import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const PageNotFound = ({ history }) => {
  if (history && history.location.pathname !== '/404') {
    history.push('/404');
  }
  return (
    <div>
      <h1>404 - The page was not found.</h1>
      <h2>
        <Link to={'/'}>Go back to frontpage</Link>
      </h2>
    </div>
  );
};

export default withRouter(PageNotFound);
