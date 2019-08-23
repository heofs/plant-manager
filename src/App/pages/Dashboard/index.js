import React from 'react';
// import styled from 'styled-components';
// import { Container, Col, Row } from 'reactstrap';
import { useAuth } from 'enhancers/useAuth';

const DashboardPage = () => {
  const { user, signout } = useAuth();

  return (
    <>
      <h2>Welcome {user.displayName}</h2>
      <button onClick={signout}>Log out</button>
      <p>
        Click on the hamburger menu/bar icon to open the sidebar, and push this
        content to the right.Click on the hamburger menu/bar icon to open the
        sidebar, and push this content to the right. Click on the hamburger
        menu/bar icon to open the sidebar, and push this content to the right.
      </p>
    </>
  );
};

export default DashboardPage;
