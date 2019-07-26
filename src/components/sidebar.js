import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import SidebarLink from './sidebar-link';
import { sizes, breakpoints } from '../constants/theme';
import greenhouseLogo from '../images/greenhouse.svg';

const StyledSidebar = styled.div`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  @media screen and (min-width: ${breakpoints.lg}) {
    width: ${sizes.sidebarWidth}!important;
  }
`;

const Brand = styled.div`
  position: relative;
  font-size: 2em;
  padding: 1em 0.75em;
  z-index: 4;

  color: #ffffff;
  line-height: 30px;
  &&& a {
    color: white;
    text-decoration: none;
    background-color: transparent;
  }
  &&&:after {
    content: '';
  }
`;

const BrandImage = styled.img`
  float: left;
  width: 34px;
  text-align: center;
  margin-left: 10px;
  margin-right: 12px;
`;

const StyledNav = styled(Nav)`
  /* margin-top: 20px;
  display: block !important; */
`;

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
  }

  render() {
    return (
      <StyledSidebar id="sidebar-id">
        <Brand>
          <NavLink to="/">
            <BrandImage src={greenhouseLogo} alt="react-logo" />
            Brand
          </NavLink>
        </Brand>
        <StyledNav>
          <SidebarLink to={'/dashboard'} icon={'braille'}>
            Dashboard
          </SidebarLink>
          <SidebarLink to={'/plants'} icon={'braille'}>
            Plants
          </SidebarLink>
          <SidebarLink to={'/varieties'} icon={'braille'}>
            Varieties
          </SidebarLink>
        </StyledNav>
      </StyledSidebar>
    );
  }
}

export default Sidebar;
