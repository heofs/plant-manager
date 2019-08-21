import React from 'react';
// import styled from 'styled-components';
// import { Container, Col, Row } from 'reactstrap';
import { withAuthentication } from 'utils/authentication';

const DashboardPage = ({ currentUser, logout, googleLogin }) => (
  <>
    <h2>Welcome {currentUser.name}</h2>
    {console.log(currentUser)}
    <button onClick={logout}>Log out</button>
    <button onClick={googleLogin}>Check</button>
    <p>
      Click on the hamburger menu/bar icon to open the sidebar, and push this
      content to the right.Click on the hamburger menu/bar icon to open the
      sidebar, and push this content to the right. Click on the hamburger
      menu/bar icon to open the sidebar, and push this content to the right.
    </p>
  </>
);

export default withAuthentication(DashboardPage);
