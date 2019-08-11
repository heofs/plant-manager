import React from 'react';
// import styled from 'styled-components';
// import { Container, Col, Row } from 'reactstrap';
import { withAuthentication } from '../utils/authentication';

const DashboardPage = ({ currentUser }) => (
  <>
    <h2>Welcome {currentUser.name}</h2>
    <p>
      Click on the hamburger menu/bar icon to open the sidebar, and push this
      content to the right.Click on the hamburger menu/bar icon to open the
      sidebar, and push this content to the right. Click on the hamburger
      menu/bar icon to open the sidebar, and push this content to the right.
    </p>
  </>
);

export default withAuthentication(DashboardPage);
