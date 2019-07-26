import React from 'react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints, sizes } from '../constants/theme';
import Header from './header';
import Sidebar from './sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  faHeart,
  faLeaf,
  faSeedling,
  faBraille,
  faPray,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faHeart, faLeaf, faSeedling, faBraille);

const StyledMain = styled.div`
  transition: margin-left 0.5s;
  padding: 16px;
  /* margin: 2em; */
  /* background-color: grey; */
  margin-left: 0px;
  @media screen and (min-width: ${breakpoints.lg}) {
    margin-left: ${sizes.sidebarWidth}!important;
  }
`;

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isSidebarOpen: true };
  }
  componentDidMount() {
    this.toggleSidebar();
  }
  openSidebar() {
    document.getElementById('sidebar-id').style.width = sizes.sidebarWidth;
    document.getElementById('main').style.marginLeft = sizes.sidebarWidth;
  }

  closeSidebar() {
    document.getElementById('sidebar-id').style.width = '0';
    document.getElementById('main').style.marginLeft = '0';
  }
  toggleSidebar() {
    console.log('Toggling sidebar');
    if (this.state.isSidebarOpen) {
      this.setState(
        {
          isSidebarOpen: false,
        },
        this.closeSidebar()
      );
    } else {
      this.setState(
        {
          isSidebarOpen: true,
        },
        this.openSidebar()
      );
    }
  }
  render() {
    const { children } = this.props;
    return (
      <>
        <Sidebar isOpen={this.state.isSidebarOpen} />
        <StyledMain id="main">
          <Header toggleSidebar={this.toggleSidebar.bind(this)} />
          {/* <button className="openbtn" onClick={() => this.toggleSidebar()}>
            ☰ Toggle Sidebar
          </button> */}
          {children}
        </StyledMain>
      </>
    );
  }
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
