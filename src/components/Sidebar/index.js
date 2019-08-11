import React from 'react';
import { Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import SidebarLink from './SidebarLink';

import { sizes, breakpoints } from '../../constants/theme';
import greenhouseLogo from '../../images/greenhouse.svg';

const StyledSidebar = styled.div`
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  width: ${props => (props.isOpen ? sizes.sidebarWidth : 0)};

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

const Sidebar = ({ isOpen }) => {
  return (
    <StyledSidebar isOpen={isOpen}>
      <Brand>
        <NavLink to="/">
          <BrandImage src={greenhouseLogo} alt="react-logo" />
          Plantager
        </NavLink>
      </Brand>
      <StyledNav>
        <SidebarLink to={'/dashboard'} icon={'braille'}>
          Dashboard
        </SidebarLink>
        <SidebarLink to={'/plants'} icon={'seedling'}>
          Plants
        </SidebarLink>
        <SidebarLink to={'/varieties'} icon={'dna'}>
          Varieties
        </SidebarLink>
        <SidebarLink to={'/login'} icon={'dna'}>
          Login
        </SidebarLink>
      </StyledNav>
    </StyledSidebar>
  );
};

export default Sidebar;
