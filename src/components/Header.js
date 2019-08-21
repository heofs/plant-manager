import React from 'react';
import styled, { css } from 'styled-components';
import { Navbar } from 'reactstrap';
import { breakpoints } from 'constants/theme';

const StyledNavbar = styled(Navbar)`
  &&& {
    display: flex;
    width: 100%;
    position: fixed;
    padding: 0;
    @media screen and (min-width: ${breakpoints.lg}) {
      display: none !important;
    }
  }
`;

const togglerConfig = {
  size: 40,
  thickness: '4px',
  closedColor: 'black',
  openColor: 'black',
};

const SidebarToggler = styled.div`
  width: ${togglerConfig.size}px;
  height: ${togglerConfig.size * (3 / 4)}px;
  position: relative;
  /* margin: 50px auto; */
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.5s ease-in-out;
  -moz-transition: 0.5s ease-in-out;
  -o-transition: 0.5s ease-in-out;
  transition: 0.5s ease-in-out;
  cursor: pointer;

  & span {
    background: ${togglerConfig.closedColor};
    display: block;
    position: absolute;
    height: ${togglerConfig.thickness};
    width: 100%;
    border-radius: ${togglerConfig.thickness};
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
  }

  & span:nth-child(1) {
    top: 0px;
  }

  & span:nth-child(2),
  & span:nth-child(3) {
    top: 13px;
  }

  & span:nth-child(4) {
    top: 26px;
  }

  ${props => {
    if (props.isOpen) {
      return css`
        & span {
          background: ${togglerConfig.openColor};
        }
        & span:nth-child(1) {
          top: 18px;
          width: 0%;
          left: 50%;
        }

        & span:nth-child(2) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
        }

        & span:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
        }

        & span:nth-child(4) {
          top: 18px;
          width: 0%;
          left: 50%;
        }
      `;
    }
  }};
`;

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <StyledNavbar>
      <SidebarToggler
        onClick={() => {
          toggleSidebar();
        }}
        isOpen={isSidebarOpen}
      >
        <span />
        <span />
        <span />
        <span />
      </SidebarToggler>
    </StyledNavbar>
  );
};

export default Header;
