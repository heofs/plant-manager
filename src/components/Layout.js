import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';

import { breakpoints, sizes } from '../constants/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-table/react-table.css';
import 'sweetalert2/src/sweetalert2.scss';

const StyledMain = styled.div`
  transition: margin-left 0.5s;
  padding: 16px;
  margin-left: ${props => (props.isSidebarOpen ? sizes.sidebarWidth : 0)};

  @media screen and (min-width: ${breakpoints.lg}) {
    margin-left: ${sizes.sidebarWidth};
  }
`;

const Content = styled.div`
  margin-top: 2.5em;
  @media screen and (min-width: ${breakpoints.lg}) {
    margin-top: 0;
  }
  transition: all 0.3s ease-in-out;
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarOpen: false };
  }

  toggleSidebar = () => {
    this.setState({
      isSidebarOpen: this.state.isSidebarOpen ? false : true,
    });
  };
  render() {
    const { children } = this.props;
    return (
      <>
        <Sidebar isOpen={this.state.isSidebarOpen} />
        <StyledMain isSidebarOpen={this.state.isSidebarOpen}>
          <Header
            toggleSidebar={this.toggleSidebar}
            isSidebarOpen={this.state.isSidebarOpen}
          />
          <Content>{children}</Content>
        </StyledMain>
      </>
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
