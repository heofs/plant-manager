import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import errorImage from 'images/error-404.svg';

const Wrapper = styled.div`
  margin-top: 5em;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const NotFoundPage = ({ history }) => {
  if (history && history.location.pathname === '/login') {
    return <Redirect to={'/'} />;
  }
  return (
    <Wrapper>
      <img src={errorImage} alt="404" height={'200px'} />
      <h1>Sorry, the page was not found</h1>
      <p>
        Route{' '}
        <span className="font-weight-bold">{history.location.pathname}</span>{' '}
        was not found.
      </p>
      <h2>
        <Link to={'/'}>Go back to frontpage</Link>
      </h2>
    </Wrapper>
  );
};

export default withRouter(NotFoundPage);
